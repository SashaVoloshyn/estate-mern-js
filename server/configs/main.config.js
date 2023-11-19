import dotenv from 'dotenv';

dotenv.config();

export const mainConfig = {
	PORT: process.env.PORT || 5303,
	MONGO : process.env.MONGO,
	SALT : process.env.SALT,
	JWT_SECRET: process.env.JWT_SECRET

};