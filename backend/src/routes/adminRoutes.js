const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  activateUser,
  deactivateUser,
} = require("../controllers/adminController");

router.get("/users", protect, isAdmin, getAllUsers);
router.patch("/users/:id/activate", protect, isAdmin, activateUser);
router.patch("/users/:id/deactivate", protect, isAdmin, deactivateUser);

module.exports = router;
