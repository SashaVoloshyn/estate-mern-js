import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { mainConfig } from "./configs/main.config.js";
import { usersRouter } from "./routes/users.router.js";
import { authRouter } from "./routes/auth.router.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use("/api/user", usersRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const { PORT, MONGO } = mainConfig;

app.listen(PORT, async () => {
  console.log(`Server is running on port : ${PORT}`);
  try {
    const connection = await mongoose.connect(MONGO);
    if (connection) console.log("DATABASE has been connected");
  } catch (e) {
    console.log("Error connection to DATABASE", e);
  }
});
