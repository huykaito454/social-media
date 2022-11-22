import authService from "../services/authService";
let register = async (req, res) => {
  let data = await authService.register(req.body);
  if (data.errorCode === 500) {
    return res.status(500).json({ message: data.message, status: 500 });
  }
  if (data.errorCode === 400) {
    return res.status(400).json({ message: data.message, status: 400 });
  }
  return res.status(200).json({
    message: data.message,
    status: 200,
  });
};
let login = async (req, res) => {
  console.log(req.body);
  let data = await authService.login(req.body);
  if (data.errorCode === 500) {
    return res.status(500).json({ message: data.message, status: 500 });
  }
  if (data.errorCode === 400) {
    return res.status(400).json({ message: data.message, status: 400 });
  }
  return res.status(200).json({
    accessToken: data.accessToken,
    message: data.message,
    status: 200,
  });
};
export { register, login };
