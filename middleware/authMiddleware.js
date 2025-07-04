const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // ✅ Read token from cookie

  if (!token) {
    return res.status(401).json({ error: "Not authenticated (No token)" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach userId for downstream use
    req.user = {
      userId: decoded.userId || decoded.id, // Just in case you used `id` instead
    };

    next(); // Proceed to the next middleware/route
  } catch (err) {
    console.error("JWT Error:", err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
