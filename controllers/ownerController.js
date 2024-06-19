const Owner = require("../models/Owner");

// Get An Owner And Their Movies
exports.getOwnerWithMovies = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (owner) {
      const movies = await owner.getMovies();
      res.json({ owner, movies });
    } else {
      res.status(404).json({ message: "Owner not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching owner with movies", error });
  }
};
// Update Owner Details
exports.updateOwnerDetails = async (req, res) => {
  const { name, email, password } = req.body;

  const owner = await Owner.findById(req.owner._id);

  if (user) {
    owner.name = name || owner.name;
    owner.password = email || owner.email;
    user.password = password || owner.password;

    const updatedOwner = await owner.save();
    res.json(updatedOwner);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
