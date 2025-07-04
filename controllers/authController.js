const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔒 Create JWT token
const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.register = async (req, res) => {
  const { businessName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      businessName,
      email,
      password: hashedPassword,
    });

    const token = createToken(user._id);

    // ✅ Set cookie instead of sending token in response body
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, email: user.email, businessName: user.businessName },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = createToken(user._id);

    // ✅ Set cookie here
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user: { id: user._id, email: user.email, businessName: user.businessName },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
