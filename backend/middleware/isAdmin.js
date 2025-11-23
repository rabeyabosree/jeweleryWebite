// middleware/isAdmin.js
const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      return next(); // user admin হলে next() call হবে
    } else {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    console.error("isAdmin middleware error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = isAdmin;
