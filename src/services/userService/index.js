import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import db from "../../models/index";
dotenv.config();
const profile = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const User = await db.User.findOne({
        where: {
          email: data.email,
        },
        attributes: {
          exclude: ["password", "refreshToken"],
        },
      });
      if (User) {
        if (User.dataValues.avatar == "" || !User.dataValues.avatar) {
          User.dataValues.avatar =
            process.env.URL + "assets/images/default/avatar/avatar-default.jpg";
        }
        if (User.dataValues.backGround == "" || !User.dataValues.backGround) {
          User.dataValues.backGround =
            process.env.URL +
            "assets/images/default/background/background-default.jpg";
        }
        return resolve({
          message: "Get Profile Complete",
          data: User,
        });
      } else {
        return reject({
          errorCode: 400,
          message: "User not found",
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
const updateAvatar = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const User = await db.User.findOne({
        where: {
          email: data.email,
        },
      });
      if (User) {
        imageName = "./src/assets/images/" + data.id + "/avatar";
        checkFolderExist(imageName);
        upload(data.data.req, data.data.res, async (err) => {
          if (err) {
            return reject({
              errorCode: 500,
              message: "Internal server error.",
            });
          } else {
            await db.User.update(
              {
                avatar:
                  process.env.URL +
                  "assets/images/" +
                  data.id +
                  "/avatar/" +
                  data.data.req.file.filename,
              },
              {
                where: {
                  email: data.email,
                },
              }
            );
            return resolve({
              message: "Update Avatar Complete",
              data: true,
            });
          }
        });
      } else {
        return reject({
          errorCode: 400,
          message: "User not found",
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
const updateBackground = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const User = await db.User.findOne({
        where: {
          email: data.email,
        },
      });
      if (User) {
        imageName = "./src/assets/images/" + data.id + "/background";
        checkFolderExist(imageName);
        upload(data.data.req, data.data.res, async (err) => {
          if (err) {
            return reject({
              errorCode: 500,
              message: "Internal server error.",
            });
          } else {
            await db.User.update(
              {
                backGround:
                  process.env.URL +
                  "assets/images/" +
                  data.id +
                  "/background/" +
                  data.data.req.file.filename,
              },
              {
                where: {
                  email: data.email,
                },
              }
            );
            return resolve({
              message: "Update Background Complete",
              data: true,
            });
          }
        });
      } else {
        return reject({
          errorCode: 400,
          message: "User not found",
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
let imageName = "";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(imageName);
    cb(null, imageName);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");
const checkFolderExist = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};
export { profile, updateAvatar, updateBackground };
