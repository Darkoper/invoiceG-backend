const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
