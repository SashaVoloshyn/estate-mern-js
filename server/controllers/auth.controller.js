import User from "../models/user.model.js";
import { bcryptService } from "../services/bcrypt.service.js";

class AuthController {
  async signUp(req, res, next) {
    const { username, password, email } = req.body;
    const hashedPassword = await bcryptService.hashPassword(password);
    const newUser = new User({ email, password: hashedPassword, username });
    try {
      await newUser.save();
      res.status(201).json("User create successfully");
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
