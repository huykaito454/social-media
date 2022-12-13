import { Token } from "../../constants";

const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  // [Bearers,token]
  const token = authHeader && authHeader.split(" ")[1];
  console.log("verifyToken ~ token", token);

  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, Token.ACCESS_TOKEN_SECRET);
    req.id = decoded.id;
    req.email = decoded.email;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token not found", status: 403 });
  }
};
export { verifyToken };
