const express = require("express");
const router = express.Router();
const Suggestion = require("../models/suggestion");
const mongoose = require("mongoose");

// Save new suggestion
router.post("/", async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Missing name" });
    }

    const query = {
      name,
      userId: userId ? new mongoose.Types.ObjectId(userId) : null,
    };

    const existing = await Suggestion.findOne(query);
    if (!existing) {
      await Suggestion.create(query); // already has name and userId
    }

    res.status(201).json({ message: "Suggestion saved" });
  } catch (err) {
    console.error("Error saving suggestion:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch matching suggestions
router.get("/", async (req, res) => {
  const { q = "", userId } = req.query;
  try {
    const regex = new RegExp(`^${q}`, "i"); // Match names that start with q

    let filter = {
      name: { $regex: regex },
    };

    if (mongoose.isValidObjectId(userId)) {
      filter.$or = [
        { userId: new mongoose.Types.ObjectId(userId) },
        { userId: null },
      ];
    } else {
      filter.userId = null;
    }

    const suggestions = await Suggestion.find(filter).limit(10);
    res.json(suggestions);
  } catch (err) {
    console.error("❌ Error fetching suggestions:", err);
    res.status(500).json({ message: "Error fetching suggestions" });
  }
});
module.exports = router;
