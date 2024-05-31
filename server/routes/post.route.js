import express from "express";
const router = express.Router();
import {
  createPostController,
  fetchPostsController,
  // fetchAllPostsController,
} from "../controllers/post.controller.js";

// router.get("/", fetchAllPostsController);
router.get("/:user_id", fetchPostsController);
router.post("/create", createPostController);

export default router;
