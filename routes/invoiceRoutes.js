const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");
const auth = require("../middleware/authMiddleware");

// PUT: Update an invoice by ID (Protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const invoiceId = req.params.id;
    // Only allow update if invoice belongs to the user
    const invoice = await Invoice.findOne({ _id: invoiceId, userId: req.user.userId });
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    // Update fields
    Object.assign(invoice, req.body);
    await invoice.save();
    res.status(200).json(invoice);
  } catch (err) {
    console.error("❌ Error updating invoice:", err);
    res.status(400).json({ error: "Failed to update invoice" });
  }
});
// POST: Create a new invoice (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const {
      businessName,
      registrationNumber,
      businessAddress,
      cityRegion,
      representativeName,
      department,
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
      department,
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

// GET: Fetch a single invoice by ID (Protected)
router.get("/:id", auth, async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.status(200).json(invoice);
  } catch (err) {
    console.error("❌ Error fetching invoice by ID:", err);
    res.status(500).json({ error: "Failed to fetch invoice" });
  }
});

module.exports = router;
