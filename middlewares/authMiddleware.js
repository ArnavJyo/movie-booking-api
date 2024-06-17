const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Owner = require("../models/Owner");

const protect = (role) => async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (role === "user") {
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) throw new Error("User not found");
    } else if (role === "owner") {
      req.owner = await Owner.findById(decoded.id).select("-password");
      if (!req.owner) throw new Error("Owner not found");
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protect };
