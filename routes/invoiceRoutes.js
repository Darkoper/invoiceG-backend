const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");
const auth = require("../middleware/authMiddleware");

// POST: Create a new invoice (Protected)
// POST: Create a new invoice (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const {
      businessName,
      registrationNumber,
      businessAddress,
      cityRegion,
      representativeName,
      invoiceNumber,
      date,
      clientDetails,
      contactInformation,
      referenceNumber,
      serviceDescription,
      items,
      totalAmount,
      discount,
      cgst,
      sgst,
      paymentTerms,
      customerNumber,
    } = req.body;

    const invoice = new Invoice({
      businessName,
      registrationNumber,
      businessAddress,
      cityRegion,
      representativeName,
      invoiceNumber,
      date,
      clientDetails,
      contactInformation,
      referenceNumber,
      serviceDescription,
      items,
      totalAmount,
      discount,
      cgst,
      sgst,
      paymentTerms,
      customerNumber,
      userId: req.user.userId,
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    console.error("❌ Error creating invoice:", err);
    res.status(400).json({ error: "Failed to create invoice" });
  }
});


// GET: Fetch all invoices of logged-in user (Protected)
router.get("/", auth, async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user.userId });
    res.status(200).json(invoices);
  } catch (err) {
    console.error("❌ Error fetching invoices:", err);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

module.exports = router;
