import express from "express";
const router = express.Router();

import { profileController } from "../controllers/user.controller.js";

router.get("/profile", profileController);

export default router;
