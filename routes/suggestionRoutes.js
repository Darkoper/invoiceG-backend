const express = require("express");
const router = express.Router();
const Suggestion = require("../models/suggestion");

// Save new suggestion
router.post("/", async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({ error: "Missing name or userId" });
    }

    const existing = await Suggestion.findOne({ name, userId });
    if (!existing) {
      await Suggestion.create({ name, userId });
    }

    res.status(201).json({ message: "Suggestion saved" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch matching suggestions
router.get("/", async (req, res) => {
  const { q = "", userId } = req.query;
  try {
    const regex = new RegExp(q, "i");
    const suggestions = await Suggestion.find({
      $or: [{ userId }, { userId: null }],
      name: { $regex: regex },
    }).limit(10);

    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching suggestions" });
  }
});


module.exports = router;
