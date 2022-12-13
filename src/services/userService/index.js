import db from "../../models/index";
const profile = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const User = await db.User.findOne({
        where: {
          email: data.email,
        },
        attributes: {
          exclude: ["id", "password", "refreshToken"],
        },
      });
      if (User) {
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
export { profile };
