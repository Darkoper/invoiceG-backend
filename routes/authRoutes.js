const express = require("express");
const router = express.Router();
const { register, login, getCurrentUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", register);   // For registration
router.post("/login", login);       // For login
router.get("/me", authMiddleware, getCurrentUser);  // For getting current user

module.exports = router;
