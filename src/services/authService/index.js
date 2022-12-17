import { generateToken } from "../../middlewares/generateToken";
import db from "../../models/index";
import { comparePassword, hashPassword } from "../../utils/handlePassword";
const register = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existedUser = await db.User.findOne({
        where: {
          email: data.email,
        },
      });
      if (existedUser) {
        return reject({
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
      return reject({
        errorCode: 500,
        message: "Internal server error.",
      });
    }
  });
};
const login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: data.email,
        },
      });
      if (!user) {
        return reject({
          errorCode: 400,
          message: "User not found.",
        });
      } else {
        const checkPassword = await comparePassword(
          data.password,
          user.password
        );
        if (checkPassword) {
          const token = await generateToken(user);
          await db.User.update(
            { refreshToken: token.refreshToken },
            {
              where: {
                email: data.email,
              },
            }
          );
          return resolve({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            message: "Login success.",
          });
        } else {
          return reject({
            errorCode: 400,
            message: "User not found.",
          });
        }
      }
    } catch (error) {
      return reject({
        errorCode: 500,
        message: "Internal server error.",
      });
    }
  });
};
const token = (refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: {
          refreshToken: refreshToken,
        },
      });
      if (!user) {
        return reject({
          errorCode: 403,
          message: "Not found",
        });
      } else {
        const token = generateToken(user);
        await db.User.update(
          { refreshToken: token.refreshToken },
          {
            where: {
              email: user.email,
            },
          }
        );
        return resolve({
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          message: "Success",
        });
      }
    } catch (error) {
      return reject({
        errorCode: 500,
        message: "Internal server error.",
      });
    }
  });
};
module.exports = { register, login, token };
