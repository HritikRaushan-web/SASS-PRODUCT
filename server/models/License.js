const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema({
  licenseKey: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  orderId: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'revoked'],
    default: 'active'
  },
  domainBinding: {
    type: String,
    default: '*'
  },
  activationsCount: {
    type: Number,
    default: 0
  },
  maxActivations: {
    type: Number,
    default: 999 // Unlimited domains/activations for white-label source code
  },
  issuedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: null // Lifetime access
  }
});

module.exports = mongoose.model('License', licenseSchema);

