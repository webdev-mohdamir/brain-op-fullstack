import express from "express";
const router = express.Router();

import { authenticateReq } from "../middleware/auth.middleware.js";

import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import postRoutes from "./post.route.js";

router.use("/auth", authRoutes);

router.use("/posts", authenticateReq, postRoutes);
router.use("/", authenticateReq, userRoutes);

export default router;
