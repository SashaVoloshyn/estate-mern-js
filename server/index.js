import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

import { mainConfig } from "./configs/main.config.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

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
