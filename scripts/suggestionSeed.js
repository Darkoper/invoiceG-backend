import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import ProductSuggestion from "../models/suggestion.js"; // ✅ Make sure your model uses `export default`

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env variables
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

async function seedSuggestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await ProductSuggestion.deleteMany({});
    console.log("🧹 Cleared old suggestions");

    await ProductSuggestion.insertMany(suggestions);
    console.log("✅ Seeded product suggestions");

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err.message);
    process.exit(1);
  }
}

seedSuggestions();
