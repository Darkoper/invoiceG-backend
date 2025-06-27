const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const auth = require('../middleware/authMiddleware');

// Create Invoice (Protected)
router.post('/', auth, async (req, res) => {
  try {
    const invoice = new Invoice({
      ...req.body,
      createdBy: req.user.userId // Add user info from token
    });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Invoices of Logged In User (Protected)
router.get('/', auth, async (req, res) => {
  try {
    const invoices = await Invoice.find({ createdBy: req.user.userId });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
