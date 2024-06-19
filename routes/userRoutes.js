const express = require("express");
const { updateUserProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.put("/profile", protect("user"), updateUserProfile);
router.get("/:id/bookings", protect("user"), getUserBookings);

module.exports = router;
