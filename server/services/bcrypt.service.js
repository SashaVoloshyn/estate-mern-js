import bcryptjs from "bcryptjs";

import { mainConfig } from "../configs/main.config.js";

class BcryptService {
  async hashPassword(password) {
    return bcryptjs.hash(password, Number(mainConfig.SALT));
  }

  async compare(password, passwordFromDb) {
    return bcryptjs.compare(password, passwordFromDb);
  }
}

export const bcryptService = new BcryptService();
