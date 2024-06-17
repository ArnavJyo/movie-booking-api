const express = require("express");
const {
  registerUser,
  authUser,
  registerOwner,
  authOwner,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register/user", registerUser);
router.post("/login/user", authUser);
router.post("/register/owner", registerOwner);
router.post("/login/owner", authOwner);

module.exports = router;
