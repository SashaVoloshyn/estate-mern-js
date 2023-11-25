import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";
import { verifyToken } from '../utils/verifyUser.js';

export const usersRouter = Router();

usersRouter.get("/test", usersController.test);
usersRouter.post("/update/:id", verifyToken, usersController.updateUser);
