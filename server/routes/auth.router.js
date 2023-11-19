import { Router } from "express";

import { authController } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", authController.signIn);
