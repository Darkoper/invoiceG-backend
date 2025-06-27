const Suggestion = require("../models/suggestion");

exports.getSuggestions = async (req, res) => {
  const { q, userId } = req.query;
  if (!q) return res.json([]);

  const regex = new RegExp(`^${q}`, "i");

  const results = await Suggestion.find({
    name: regex,
    $or: [{ createdBy: null }, { createdBy: userId }],
  })
    .sort({ createdAt: -1 })
    .limit(10);

  res.json(results);
};

exports.addSuggestion = async (req, res) => {
  const { name, userId } = req.body;

  const existing = await Suggestion.findOne({ name, createdBy: userId });
  if (existing) return res.status(200).json(existing);

  const newItem = new Suggestion({ name, createdBy: userId });
  await newItem.save();

  res.status(201).json(newItem);
};
