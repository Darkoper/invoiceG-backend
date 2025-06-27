const invoiceSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  items: [
    {
      description: String,
      quantity: Number,
      price: Number,
    }
  ],
  totalAmount: Number,
  invoiceDate: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
