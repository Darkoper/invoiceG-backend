const mongoose = require("mongoose");
const Suggestion = require("../models/suggestion.model");

const getSuggestions = async (req, res) => {
  try {
    const { q, userId } = req.query;
    const regex = new RegExp(q, "i");

    const suggestions = await Suggestion.find({
      name: { $regex: regex },
      $or: [
        { userId: userId },       // personal suggestions
        { userId: null },         // public ones
      ],
    }).limit(10);

    res.json(suggestions);
  } catch (error) {
    console.error("Failed to fetch suggestions", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addSuggestion = async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({ error: "name and userId are required" });
    }

    const existing = await Suggestion.findOne({ name, userId });
    if (existing) return res.status(200).json(existing);

    const newSuggestion = new Suggestion({ name, userId });
    await newSuggestion.save();

    res.status(201).json(newSuggestion);
  } catch (error) {
    console.error("Failed to add suggestion", error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { getSuggestions, addSuggestion };
