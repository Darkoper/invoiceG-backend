const express = require("express");
const cookieParser = require("cookie-parser"); // ✅ Import it here
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.config");

dotenv.config();
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware setup
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "http://localhost:5173"
        : [
            "http://localhost:5173",
            "http://localhost:3000",
            "http://127.0.0.1:5173",
          ],
    credentials: true, // allow cookies
  })
);
app.use(express.json());
app.use(cookieParser()); // ✅ Middleware to parse cookies

// ✅ API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/suggestions", require("./routes/suggestionRoutes"));
app.use("/api/invoices", require("./routes/invoiceRoutes"));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
