import { errorHandler } from "./error.js";
import { jwtService } from "../services/jwt.service.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));

  const user =   jwtService.verify(token);
  if (!user) return next(errorHandler(403, "Forbidden"));

  req.user = user;
  next();
};
