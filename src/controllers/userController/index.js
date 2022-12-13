import * as userService from "../../services/userService";
const profile = async (req, res) => {
  if (req.id && req.email) {
    await userService
      .profile({ id: req.id, email: req.email })
      .then((result) => {
        return res.status(200).json({
          data: result.data,
          message: result.message,
          status: 200,
        });
      })
      .catch((error) => {
        if (error.errorCode === 500) {
          return res.status(500).json({ message: error.message, status: 500 });
        }
        if (error.errorCode === 400) {
          return res.status(400).json({ message: error.message, status: 400 });
        }
      });
  } else {
    return res.status(403).json({ message: "Token not found", status: 403 });
  }
};
export { profile };
