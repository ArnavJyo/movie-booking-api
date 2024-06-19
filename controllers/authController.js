const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Owner = require("../models/Owner");
// Creating JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// User Registration
exports.registerUser = async (req, res) => {
  const { name, email, password, gender, dob } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    gender,
    dob,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Owner Registration
exports.registerOwner = async (req, res) => {
  const { name, email, password } = req.body;
  const ownerExists = await Owner.findOne({ email });

  if (ownerExists) {
    return res.status(400).json({ message: "Owner already exists" });
  }

  const owner = await Owner.create({
    name,
    email,
    password,
  });

  if (owner) {
    res.status(201).json({
      _id: owner._id,
      name: owner.name,
      email: owner.email,
      token: generateToken(owner._id),
    });
  } else {
    res.status(400).json({ message: "Invalid owner data" });
  }
};

// User Login
exports.authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// Owner Login
exports.authOwner = async (req, res) => {
  const { email, password } = req.body;
  const owner = await Owner.findOne({ email });

  if (owner && (await owner.matchPassword(password))) {
    res.json({
      _id: owner._id,
      name: owner.name,
      email: owner.email,
      token: generateToken(owner._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
