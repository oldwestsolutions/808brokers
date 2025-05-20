const express = require('express');
const cors = require('cors');
const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Fabric connection state
let gateway = null;
let contract = null;
let eventListeners = new Map();

// Initialize Fabric connection
async function initFabric() {
  try {
    // Load connection profile
    const ccpPath = path.resolve(__dirname, '../../connection-profile.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system based wallet
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check if admin identity exists
    const adminExists = await wallet.get('admin');
    if (!adminExists) {
      console.log('Admin identity not found in wallet');
      return false;
    }

    // Create a new gateway
    gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: 'admin',
      discovery: { enabled: true, asLocalhost: true }
    });

    // Get the network and contract
    const network = await gateway.getNetwork('mychannel');
    contract = network.getContract('basic');

    // Set up event listeners
    setupEventListeners(network);

    return true;
  } catch (error) {
    console.error('Failed to initialize Fabric:', error);
    return false;
  }
}

// Set up event listeners for the network
function setupEventListeners(network) {
  // Listen for block events
  network.addBlockListener(async (block) => {
    const blockNumber = block.header.number.toString();
    console.log(`New block received: ${blockNumber}`);
    
    // Process block events and notify connected clients
    const events = await processBlockEvents(block);
    notifyEventListeners('block', events);
  });

  // Listen for contract events
  contract.addContractListener(async (event) => {
    console.log('Contract event received:', event);
    notifyEventListeners('contract', event);
  });
}

// Process block events
async function processBlockEvents(block) {
  const events = [];
  for (const data of block.data.data) {
    if (data.payload && data.payload.data && data.payload.data.actions) {
      for (const action of data.payload.data.actions) {
        if (action.payload && action.payload.action && action.payload.action.proposal_response_payload) {
          const response = action.payload.action.proposal_response_payload;
          if (response.extension && response.extension.events) {
            events.push(response.extension.events);
          }
        }
      }
    }
  }
  return events;
}

// Notify all connected event listeners
function notifyEventListeners(type, data) {
  const listeners = eventListeners.get(type) || [];
  listeners.forEach(listener => {
    listener.write(`data: ${JSON.stringify(data)}\n\n`);
  });
}

// API Routes
app.get('/api/status', async (req, res) => {
  try {
    const isConnected = gateway !== null && contract !== null;
    res.json({ connected: isConnected });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/connect', async (req, res) => {
  try {
    if (gateway === null) {
      const success = await initFabric();
      if (success) {
        res.json({ success: true });
      } else {
        res.status(500).json({ success: false, message: 'Failed to connect to Fabric network' });
      }
    } else {
      res.json({ success: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/disconnect', async (req, res) => {
  try {
    if (gateway) {
      // Clean up event listeners
      eventListeners.forEach((listeners, type) => {
        listeners.forEach(listener => listener.end());
      });
      eventListeners.clear();
      
      gateway.disconnect();
      gateway = null;
      contract = null;
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/assets', async (req, res) => {
  try {
    if (!contract) {
      throw new Error('Not connected to Fabric network');
    }

    const result = await contract.evaluateTransaction('GetAllAssets');
    const assets = JSON.parse(result.toString());
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SSE endpoint for streaming events
app.get('/api/events', (req, res) => {
  const type = req.query.type || 'all';
  
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // Add this client to the event listeners
  if (!eventListeners.has(type)) {
    eventListeners.set(type, []);
  }
  eventListeners.get(type).push(res);

  // Remove client when connection closes
  req.on('close', () => {
    const listeners = eventListeners.get(type);
    const index = listeners.indexOf(res);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 