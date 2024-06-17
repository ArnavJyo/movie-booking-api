const express = require("express");
const {
  createMovie,
  updateMovie,
  bookSeats,
} = require("../controllers/movieController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect("owner"), createMovie);
router.put("/update/:id", protect("owner"), updateMovie);
router.post("/book", protect("user"), bookSeats);

module.exports = router;
