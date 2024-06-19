const express = require("express");
const router = express.Router();
const {
  getOwnerWithMovies,
  updateOwnerDetails,
} = require("../controllers/ownerController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/:id/movies", protect("owner"), getOwnerWithMovies);
router.put("/profile", protect("owner"), updateOwnerDetails);

module.exports = router;
