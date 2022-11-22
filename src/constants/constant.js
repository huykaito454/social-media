import dotenv from "dotenv";
dotenv.config();

let Token = {
  SECRET_KEY: process.env.SECRET_KEY,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
};

export { Token };
