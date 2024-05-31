import express from "express";
import { authenticateReq } from "../middleware/auth.middleware.js";
const router = express.Router();

import { profileController } from "../controllers/user.controller.js";

router.get("/profile", authenticateReq, profileController);

export default router;
