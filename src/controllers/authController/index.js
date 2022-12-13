import authService from "../../services/authService";
const register = async (req, res) => {
  await authService
    .register(req.body)
    .then((result) => {
      return res.status(200).json({
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
};
const login = async (req, res) => {
  await authService
    .login(req.body)
    .then((result) => {
      return res.status(200).json({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
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
};
const token = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  await authService
    .token(refreshToken)
    .then((result) => {
      return res.status(200).json({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        message: result.message,
        status: 200,
      });
    })
    .catch((error) => {
      if (error.errorCode === 500) {
        return res.status(500).json({ message: error.message, status: 500 });
      }
      if (error.errorCode === 403) {
        return res.status(403).json({ message: error.message, status: 400 });
      }
    });
};
export { register, login, token };
