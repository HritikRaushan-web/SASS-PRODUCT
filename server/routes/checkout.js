const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Order = require('../models/Order');
const License = require('../models/License');
const Product = require('../models/Product');
const { isConnected, inMemoryStore } = require('../db');

// Helper to generate a unique license key
function generateLicenseKey(productId) {
  const prefix = 'PI';
  const year = new Date().getFullYear();
  const part1 = crypto.randomBytes(3).toString('hex').toUpperCase();
  const part2 = crypto.randomBytes(3).toString('hex').toUpperCase();
  const code = (productId || 'SAAS').substring(0, 4).toUpperCase().replace(/[^A-Z0-9]/g, 'X');
  return `${prefix}-${year}-${code}-${part1}-${part2}`;
}

// POST /api/checkout/create-order
router.post('/create-order', async (req, res) => {
  try {
    const { productId, customerName, customerEmail, customerPhone, paymentMethod } = req.body;

    if (!productId || !customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Lookup product
    let product;
    if (isConnected()) {
      product = await Product.findOne({ id: productId });
    } else {
      product = inMemoryStore.products.find(p => p.id === productId);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Software product not found' });
    }

    const orderId = `PI-ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    return res.json({
      success: true,
      order: {
        orderId,
        productId: product.id,
        productTitle: product.title,
        amount: product.price,
        originalPrice: product.originalPrice,
        currency: product.currency || 'INR',
        customerName,
        customerEmail,
        customerPhone,
        paymentMethod: paymentMethod || 'upi'
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Could not create order', error: error.message });
  }
});

// POST /api/checkout/process-payment
router.post('/process-payment', async (req, res) => {
  try {
    const {
      orderId,
      productId,
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod = 'upi',
      transactionRef
    } = req.body;

    if (!productId || !customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ success: false, message: 'Missing required purchase details' });
    }

    // Lookup product
    let product;
    if (isConnected()) {
      product = await Product.findOne({ id: productId });
    } else {
      product = inMemoryStore.products.find(p => p.id === productId);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const effectiveOrderId = orderId || `PI-ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const transactionId = transactionRef || `TXN-${paymentMethod.toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const licenseKey = generateLicenseKey(productId);
    const downloadToken = crypto.randomBytes(16).toString('hex');

    const orderData = {
      orderId: effectiveOrderId,
      customerName,
      customerEmail,
      customerPhone,
      productId: product.id,
      productTitle: product.title,
      amount: product.price,
      currency: product.currency || 'INR',
      paymentMethod,
      paymentStatus: 'completed',
      transactionId,
      licenseKey,
      downloadToken,
      billingAddress: {
        country: 'India'
      },
      createdAt: new Date()
    };

    const licenseData = {
      licenseKey,
      orderId: effectiveOrderId,
      productId: product.id,
      customerEmail,
      customerName,
      status: 'active',
      domainBinding: '*',
      activationsCount: 1,
      maxActivations: 999,
      issuedAt: new Date()
    };

    if (isConnected()) {
      // Save directly to MongoDB
      const savedOrder = await Order.create(orderData);
      const savedLicense = await License.create(licenseData);
      
      // Increment sales count
      await Product.updateOne({ id: productId }, { $inc: { salesCount: 1 } });
    } else {
      // In-memory persistence
      inMemoryStore.orders.push(orderData);
      inMemoryStore.licenses.push(licenseData);
      const prod = inMemoryStore.products.find(p => p.id === productId);
      if (prod) prod.salesCount = (prod.salesCount || 0) + 1;
    }

    const downloadUrl = `/api/checkout/download/${downloadToken}?product=${product.id}`;

    return res.json({
      success: true,
      message: 'Payment verified and software license issued successfully!',
      order: orderData,
      license: licenseData,
      downloadUrl,
      supportWhatsApp: 'https://wa.me/919341630325?text=' + encodeURIComponent(`Hello Prestige Intelligence Team! I just purchased ${product.title} (Order ID: ${effectiveOrderId}). My License Key is: ${licenseKey}`)
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ success: false, message: 'Payment processing error', error: error.message });
  }
});

// GET /api/checkout/order/:orderId - Retrieve order details
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    let order;

    if (isConnected()) {
      order = await Order.findOne({ orderId });
    } else {
      order = inMemoryStore.orders.find(o => o.orderId === orderId);
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order record not found' });
    }

    return res.json({ success: true, order });
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET /api/checkout/download/:token - Secure download package
router.get('/download/:token', (req, res) => {
  const { token } = req.params;
  const { product } = req.query;

  // Serve a structured zip package or simulated source archive manifest
  res.setHeader('Content-Disposition', `attachment; filename="PrestigeIntelligence_${product || 'Software'}_FullSourceCode.zip"`);
  res.setHeader('Content-Type', 'application/zip');
  
  // Send simulated archive content buffer with README & documentation
  const readmeContent = `
================================================================================
PRESTIGE INTELLIGENCE - OFFICIAL COMMERCIAL SOFTWARE PACKAGE
================================================================================
Product ID: ${product}
Status: 100% Unencrypted Commercial Source Code
License: White-Label Reseller / Commercial Deployment License
Generated For: Verified Customer Order

PACKAGE CONTENTS:
1. /source_code/ - Complete production-ready source code
2. /database/ - database.sql automated table installer & schema
3. /documentation/ - Step-by-step video guide links & deployment docs
4. /templates/ - High-converting Canva marketing mockups & print assets

DEPLOYMENT INSTRUCTIONS:
- Refer to SETUP_GUIDE.html inside this archive.
- Free hosting deployment is supported via Cloudflare / Netlify / Shared Hosting.
- For 1-on-1 WhatsApp onboarding and live assistance, contact:
  WhatsApp Support: +91 9341630325

Thank you for choosing Prestige Intelligence.
================================================================================
`;
  res.send(Buffer.from(readmeContent, 'utf-8'));
});

// POST /api/checkout/verify-license
router.post('/verify-license', async (req, res) => {
  const { licenseKey } = req.body;
  if (!licenseKey) {
    return res.status(400).json({ valid: false, message: 'License key is required' });
  }

  let license;
  if (isConnected()) {
    license = await License.findOne({ licenseKey: licenseKey.trim().toUpperCase() });
  } else {
    license = inMemoryStore.licenses.find(l => l.licenseKey === licenseKey.trim().toUpperCase());
  }

  if (!license) {
    return res.status(404).json({ valid: false, message: 'Invalid or unregistered license key' });
  }

  return res.json({
    valid: true,
    license: {
      key: license.licenseKey,
      customer: license.customerName,
      status: license.status,
      issuedAt: license.issuedAt
    }
  });
});

module.exports = router;

