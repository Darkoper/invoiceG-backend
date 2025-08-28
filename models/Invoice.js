const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  // Business / Bill From
  businessName: String,
  registrationNumber: String,
  businessAddress: String,
  cityRegion: String,
  representativeName: String,
  department: String,

  // Invoice Details
  invoiceNumber: String,
  date: {
    type: Date,
    default: Date.now,
  },

  // Bill To
  clientDetails: String,
  contactInformation: String,
  referenceNumber: String,
  serviceDescription: String,

  // Items Array
  items: [
    {
      name: String,
      quantity: Number,
      unitPrice: Number,
      amount: Number, // quantity * unitPrice
    },
  ],

  // Totals
  totalAmount: Number,

  // Taxes
  discount: Number,
  cgst: Number,
  sgst: Number,

  // Payment Terms
  paymentTerms: String,

  // Instead of Email, Save Customer Number
  customerNumber: String,

  // User reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
