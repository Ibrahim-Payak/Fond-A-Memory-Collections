import express from "express";
import {
  getPosts,
  getPostBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostBySearch);
router.get("/", getPosts);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost); //update the existing element
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost); //1 user can only like once

export default router;
