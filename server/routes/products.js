const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { isConnected, inMemoryStore } = require('../db');
const softwareCatalog = require('../seedData');

// GET /api/products - List all software
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    if (isConnected()) {
      let query = { isActive: true };
      if (category && category !== 'all') {
        query.category = category;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tagline: { $regex: search, $options: 'i' } }
        ];
      }
      const products = await Product.find(query).sort({ salesCount: -1 });
      return res.json({ success: true, count: products.length, products });
    } else {
      // In-memory fallback
      let list = [...inMemoryStore.products];
      if (category && category !== 'all') {
        list = list.filter(p => p.category === category);
      }
      if (search) {
        const s = search.toLowerCase();
        list = list.filter(p => 
          p.title.toLowerCase().includes(s) || 
          p.description.toLowerCase().includes(s) ||
          (p.tagline && p.tagline.toLowerCase().includes(s))
        );
      }
      return res.json({ success: true, count: list.length, products: list });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error fetching products', error: error.message });
  }
});

// GET /api/products/:id - Fetch single software details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (isConnected()) {
      const product = await Product.findOne({ id });
      if (!product) {
        return res.status(404).json({ success: false, message: 'Software product not found' });
      }
      return res.json({ success: true, product });
    } else {
      const product = inMemoryStore.products.find(p => p.id === id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Software product not found' });
      }
      return res.json({ success: true, product });
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;

