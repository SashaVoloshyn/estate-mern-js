import { jwtService } from "../services/jwt.service.js";
import { errorHandler } from "../utils/error.js";
import { bcryptService } from "../services/bcrypt.service.js";
import User from "../models/user.model.js";

class UsersController {
  async test(req, res) {
    return res.json({
      message: "test route",
    });
  }

  async updateUser(req, res, next) {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, "U can only updated your own account!"));

    try {
      if (req.body.password) {
        req.body.password = await bcryptService.hashPassword(req.body.password);
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true },
      );

      const { password, ...rest } = updatedUser._doc;
      res.status(200).json({
        rest,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const usersController = new UsersController();
