import express from "express";
const router = express.Router();

import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";

router.use("/", userRoutes);
router.use("/auth", authRoutes);

export default router;
