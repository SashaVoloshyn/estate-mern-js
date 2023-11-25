import jwt from "jsonwebtoken";

import { mainConfig } from "../configs/main.config.js";

class JwtService {
  async generateToken(userId) {
    return jwt.sign({ id: userId }, mainConfig.JWT_SECRET);
  }

  verify(token) {
    return jwt.verify(token, mainConfig.JWT_SECRET);
  }
}

export const jwtService = new JwtService();
