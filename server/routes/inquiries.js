const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { isConnected, inMemoryStore } = require('../db');

// POST /api/inquiries - Submit an inquiry or callback request
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, productId, productTitle, message, source } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and Phone number are required' });
    }

    const inquiryData = {
      name,
      phone,
      email: email || '',
      productId: productId || '',
      productTitle: productTitle || '',
      message: message || 'Interested in turnkey SaaS source code licensing.',
      source: source || 'web_form',
      createdAt: new Date()
    };

    if (isConnected()) {
      await Inquiry.create(inquiryData);
    } else {
      inMemoryStore.inquiries.push(inquiryData);
    }

    // Direct WhatsApp link
    const waText = encodeURIComponent(`Hello Prestige Intelligence Team! My name is ${name} (${phone}). I would like more information regarding ${productTitle || 'your software source codes'}.`);
    const waUrl = `https://wa.me/919341630325?text=${waText}`;

    return res.json({
      success: true,
      message: 'Inquiry saved successfully! Our engineering team will contact you.',
      waUrl
    });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ success: false, message: 'Server error saving inquiry', error: error.message });
  }
});

// GET /api/inquiries - List inquiries for admin
router.get('/', async (req, res) => {
  try {
    if (isConnected()) {
      const inquiries = await Inquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, inquiries });
    } else {
      return res.json({ success: true, inquiries: inMemoryStore.inquiries });
    }
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;

