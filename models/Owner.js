const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const OwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

OwnerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

OwnerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
OwnerSchema.virtual("movies", {
  ref: "Movie",
  localField: "_id",
  foreignField: "owner",
});
OwnerSchema.methods.getMovies = async function () {
  return mongoose.model("Movie").find({ owner: this._id });
};
OwnerSchema.set("toJSON", { virtuals: true });
OwnerSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Owner", OwnerSchema);
