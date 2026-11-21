const mongoose = require('mongoose');
const Product = require('./models/Product');
const softwareCatalog = require('./seedData');

let isConnected = false;
let isUsingFallback = false;

// Fallback in-memory store in case MongoDB daemon is temporarily unavailable
const inMemoryStore = {
  products: [...softwareCatalog],
  orders: [],
  licenses: [],
  inquiries: []
};

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prestige_intelligence';

  try {
    console.log(`[MongoDB] Connecting to: ${uri}`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000
    });
    
    isConnected = true;
    isUsingFallback = false;
    console.log('[MongoDB] Connected successfully to database: prestige_intelligence');

    // Sync products: Replace old products with the 5 new requested software
    await syncNewSoftwareCatalog();
  } catch (err) {
    console.warn(`[MongoDB Warning] Could not connect to local/remote MongoDB (${err.message}).`);
    console.warn('[MongoDB] Enabling high-resilience in-memory persistence fallback.');
    isConnected = false;
    isUsingFallback = true;
  }
}

async function syncNewSoftwareCatalog() {
  try {
    console.log('[MongoDB] Synchronizing software catalog with updated 5 flagship software systems...');
    // Clear old catalog and insert the 5 new software products
    await Product.deleteMany({});
    await Product.insertMany(softwareCatalog);
    console.log(`[MongoDB] Successfully seeded exactly ${softwareCatalog.length} software products into MongoDB!`);
  } catch (error) {
    console.error('[MongoDB Error during catalog sync]:', error.message);
  }
}

function getDatabaseStatus() {
  return {
    isConnected,
    isUsingFallback,
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prestige_intelligence',
    engine: isConnected ? 'MongoDB (Mongoose)' : 'In-Memory Resilient Store'
  };
}

module.exports = {
  connectDB,
  getDatabaseStatus,
  inMemoryStore,
  isConnected: () => isConnected,
  isUsingFallback: () => isUsingFallback
};
