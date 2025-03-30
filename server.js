const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Check if build directory exists
const buildPath = path.join(__dirname, 'build');
if (!fs.existsSync(buildPath)) {
  console.log('Build directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// Serve static files from the React build directory
app.use(express.static(buildPath));

// Health check endpoint for DigitalOcean
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Handle all routes - serve React app
app.get('/*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 