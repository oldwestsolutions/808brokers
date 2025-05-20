import { Gateway, Wallets } from 'fabric-network';
import * as FabricCAServices from 'fabric-ca-client';
import path from 'path';
import fs from 'fs';

class BlockchainService {
  constructor() {
    this.connectionProfile = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../connection-profile.json'), 'utf8'));
    this.walletPath = path.join(process.cwd(), 'wallet');
    this.channelName = 'mychannel';
    this.chaincodeName = 'music_analytics';
  }

  async connect() {
    try {
      // Create a new file system based wallet for managing identities
      const wallet = await Wallets.newFileSystemWallet(this.walletPath);
      
      // Check to see if we've already enrolled the user
      const identity = await wallet.get('user1');
      if (!identity) {
        console.log('An identity for the user "user1" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
      }

      // Create a new gateway for connecting to our peer node
      const gateway = new Gateway();
      await gateway.connect(this.connectionProfile, {
        wallet,
        identity: 'user1',
        discovery: { enabled: true, asLocalhost: true }
      });

      // Get the network (channel) our contract is deployed to
      const network = await gateway.getNetwork(this.channelName);
      
      // Get the contract from the network
      const contract = network.getContract(this.chaincodeName);
      
      return { gateway, contract };
    } catch (error) {
      console.error(`Failed to connect to blockchain: ${error}`);
      throw error;
    }
  }

  async trackStream(streamData) {
    try {
      const { gateway, contract } = await this.connect();
      
      // Submit the transaction
      const result = await contract.submitTransaction(
        'trackStream',
        JSON.stringify(streamData)
      );
      
      // Disconnect from the gateway
      gateway.disconnect();
      
      return JSON.parse(result.toString());
    } catch (error) {
      console.error(`Failed to track stream: ${error}`);
      throw error;
    }
  }

  async recordOwnership(ownershipData) {
    try {
      const { gateway, contract } = await this.connect();
      
      // Submit the transaction
      const result = await contract.submitTransaction(
        'recordOwnership',
        JSON.stringify(ownershipData)
      );
      
      // Disconnect from the gateway
      gateway.disconnect();
      
      return JSON.parse(result.toString());
    } catch (error) {
      console.error(`Failed to record ownership: ${error}`);
      throw error;
    }
  }

  async getStreamAnalytics(assetId) {
    try {
      const { gateway, contract } = await this.connect();
      
      // Evaluate the transaction
      const result = await contract.evaluateTransaction(
        'getStreamAnalytics',
        assetId
      );
      
      // Disconnect from the gateway
      gateway.disconnect();
      
      return JSON.parse(result.toString());
    } catch (error) {
      console.error(`Failed to get stream analytics: ${error}`);
      throw error;
    }
  }

  async getOwnershipHistory(assetId) {
    try {
      const { gateway, contract } = await this.connect();
      
      // Evaluate the transaction
      const result = await contract.evaluateTransaction(
        'getOwnershipHistory',
        assetId
      );
      
      // Disconnect from the gateway
      gateway.disconnect();
      
      return JSON.parse(result.toString());
    } catch (error) {
      console.error(`Failed to get ownership history: ${error}`);
      throw error;
    }
  }
}

export default new BlockchainService(); 