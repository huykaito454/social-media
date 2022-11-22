import e from "express";
import { generateToken } from "../middlewares/generateToken";
import db from "../models/index";
import { comparePassword, hashPassword } from "../utils/handlePassword";
let register = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existedUser = await db.User.findOne({
        where: {
          email: data.email,
        },
      });
      if (existedUser) {
        return resolve({
          errorCode: 400,
          message: "User already exists",
        });
      } else {
        const password = await hashPassword(data.password);
        const user = await db.User.create({
          email: data.email,
          password: password,
          fullName: data.fullName,
          userName: data.userName,
          isPublish: true,
          delete: false,
          roleId: 2,
          createdAt: new Date(),
          updateAt: new Date(),
        });
        return resolve({
          message: "Register success",
        });
      }
    } catch (error) {
      reject({
        errorCode: 500,
        message: "Internal server error.",
      });
    }
  });
};
let login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: data.email,
        },
      });
      if (!user) {
        resolve({
          errorCode: 400,
          message: "User not found.",
        });
      } else {
        const checkPassword = await comparePassword(
          data.password,
          user.password
        );
        if (checkPassword) {
          let payload = {};
          payload.userId = user.id;
          const token = await generateToken(payload);
          resolve({
            accessToken: token,
            message: "Login success.",
          });
        } else {
          resolve({
            errorCode: 400,
            message: "User not found.",
          });
        }
      }
    } catch (error) {
      resolve({
        errorCode: 500,
        message: "Internal server error.",
      });
    }
  });
};
module.exports = { register, login };
