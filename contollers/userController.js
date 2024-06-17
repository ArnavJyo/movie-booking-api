const User = require("../models/User");

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  const { name, gender, dob } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    user.gender = gender || user.gender;
    user.dob = dob || user.dob;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
