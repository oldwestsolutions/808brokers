const { Contract } = require('fabric-contract-api');

class MusicAnalyticsContract extends Contract {
  constructor() {
    super('music_analytics');
  }

  async initLedger(ctx) {
    console.info('Initializing ledger');
  }

  async trackStream(ctx, streamData) {
    const data = JSON.parse(streamData);
    const streamId = `STREAM_${Date.now()}`;
    
    const stream = {
      id: streamId,
      assetId: data.assetId,
      userId: data.userId,
      timestamp: new Date().toISOString(),
      duration: data.duration,
      platform: data.platform,
      region: data.region,
      device: data.device
    };

    await ctx.stub.putState(streamId, Buffer.from(JSON.stringify(stream)));
    return JSON.stringify(stream);
  }

  async recordOwnership(ctx, ownershipData) {
    const data = JSON.parse(ownershipData);
    const ownershipId = `OWNERSHIP_${Date.now()}`;
    
    const ownership = {
      id: ownershipId,
      assetId: data.assetId,
      ownerId: data.ownerId,
      timestamp: new Date().toISOString(),
      type: data.type, // 'original', 'derivative', 'sample'
      rights: data.rights,
      terms: data.terms
    };

    await ctx.stub.putState(ownershipId, Buffer.from(JSON.stringify(ownership)));
    return JSON.stringify(ownership);
  }

  async getStreamAnalytics(ctx, assetId) {
    const queryString = {
      selector: {
        id: { $regex: '^STREAM_' },
        assetId: assetId
      }
    };

    const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    const results = [];

    while (true) {
      const res = await iterator.next();
      if (res.value && res.value.value.toString()) {
        results.push(JSON.parse(res.value.value.toString()));
      }
      if (res.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(results);
  }

  async getOwnershipHistory(ctx, assetId) {
    const queryString = {
      selector: {
        id: { $regex: '^OWNERSHIP_' },
        assetId: assetId
      }
    };

    const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    const results = [];

    while (true) {
      const res = await iterator.next();
      if (res.value && res.value.value.toString()) {
        results.push(JSON.parse(res.value.value.toString()));
      }
      if (res.done) {
        await iterator.close();
        break;
      }
    }

    return JSON.stringify(results);
  }
}

module.exports = MusicAnalyticsContract; 