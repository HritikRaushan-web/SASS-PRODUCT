const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const License = require('../models/License');
const Product = require('../models/Product');
const Inquiry = require('../models/Inquiry');
const { isConnected, inMemoryStore, getDatabaseStatus } = require('../db');

// GET /api/admin/stats - Admin Dashboard overview
router.get('/stats', async (req, res) => {
  try {
    let orders = [];
    let licenses = [];
    let inquiries = [];
    let products = [];

    if (isConnected()) {
      orders = await Order.find().sort({ createdAt: -1 });
      licenses = await License.find().sort({ issuedAt: -1 });
      inquiries = await Inquiry.find().sort({ createdAt: -1 });
      products = await Product.find();
    } else {
      orders = inMemoryStore.orders;
      licenses = inMemoryStore.licenses;
      inquiries = inMemoryStore.inquiries;
      products = inMemoryStore.products;
    }

    const totalRevenue = orders.reduce((sum, ord) => sum + (ord.amount || 0), 0);
    const completedOrders = orders.filter(o => o.paymentStatus === 'completed').length;

    return res.json({
      success: true,
      dbStatus: getDatabaseStatus(),
      metrics: {
        totalRevenue,
        totalOrders: orders.length,
        completedOrders,
        activeLicenses: licenses.length,
        totalInquiries: inquiries.length,
        productsCount: products.length
      },
      recentOrders: orders.slice(0, 10),
      recentLicenses: licenses.slice(0, 10),
      recentInquiries: inquiries.slice(0, 10)
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;

