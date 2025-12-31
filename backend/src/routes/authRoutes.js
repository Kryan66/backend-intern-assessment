const express = require("express");
const router = express.Router();

const { signup, login, logout } = require("../controllers/authController");
const validate = require("../middleware/validate");
const { signupSchema, loginSchema } = require("../validators/authValidator");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", protect, logout);

module.exports = router;
