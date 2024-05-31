import express from "express";
import {
  loginController,
  signupController,
  logoutController,
} from "../controllers/auth.controller.js";
import { authenticateReq } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/logout", authenticateReq, logoutController);

export default router;
