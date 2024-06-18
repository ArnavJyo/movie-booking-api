const mongoose = require("mongoose");
const Owner = require("./Owner");

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  seatsBooked: {
    type: Number,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
});
MovieSchema.pre("save", async function (next) {
  try {
    const ownerExists = await Owner.findById(this.owner);
    if (!ownerExists) {
      throw new Error("Owner not found");
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Movie", MovieSchema);
