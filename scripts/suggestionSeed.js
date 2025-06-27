const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const ProductSuggestion = require("../models/suggestion");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const suggestions = [
  { name: "Headphones" },
  { name: "Laptop Stand" },
  { name: "Wireless Mouse" },
  { name: "USB-C Hub" },
  { name: "Monitor Arm" },
  { name: "Notebook" },
  { name: "Bluetooth Speaker" },
  { name: "Desk Lamp" },
  { name: "Power Bank" },
  { name: "Webcam" }
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Clear old suggestions
    await ProductSuggestion.deleteMany({});
    console.log("🧹 Cleared old suggestions");

    // Insert new ones
    await ProductSuggestion.insertMany(suggestions);
    console.log("✅ Seeded product suggestions");

    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error seeding data:", err.message);
    process.exit(1);
  });
