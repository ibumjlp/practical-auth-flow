import express from "express";
import { signUp, signIn, refreshToken } from "../controllers/auth.controller.mjs"

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/refresh-token", refreshToken);

export default router;