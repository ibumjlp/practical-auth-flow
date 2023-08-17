import express from "express";
import authMiddleware from "../middlewares/auth.middleware.mjs";
import { getAccount } from "../controllers/account.controller.mjs";

const router = express.Router();

router.get("/", authMiddleware.verifyToken, getAccount);

export default router;