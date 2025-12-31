const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const validate = require("../middleware/validate");
const { postSchema } = require("../validators/postValidator");

router.get("/", getPosts);
router.get("/:id", getPostById);

router.post("/", protect, validate(postSchema), createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, isAdmin, deletePost);

module.exports = router;
