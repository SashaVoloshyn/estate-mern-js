import User from "../models/user.model.js";
import { bcryptService } from "../services/bcrypt.service.js";
import { jwtService } from "../services/jwt.service.js";
import { errorHandler } from "../utils/error.js";

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

  async signIn(req, res, next) {
    const { email, password } = req.body;

    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, "User not found"));
      const validPassword = await bcryptService.compare(
        password,
        validUser.password,
      );
      if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
      const token = await jwtService.generateToken(validUser._id);
      const { password: pass, ...userWithOutPass } = validUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(userWithOutPass);
    } catch (e) {
      next(e);
    }
  }

  async google(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = await jwtService.generateToken(user._id);
        const { password: pass, ...userWithOutPass } = user._doc;
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(userWithOutPass);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);

        const hashedPassword =
          await bcryptService.hashPassword(generatedPassword);

        const updatedName =
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-3);

        const newUser = new User({
          email: req.body.email,
          password: hashedPassword,
          username: updatedName,
          avatar: req.body.photo,
        });

        await newUser.save();
        const token = await jwtService.generateToken(newUser._id);
        const { password: pass, ...userWithOutPass } = newUser._doc;
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(userWithOutPass);
      }
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
