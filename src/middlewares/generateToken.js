import JWT from "jsonwebtoken";
import { Token } from "../constants/Constant";

let generateToken = (payload) => {
  return JWT.sign(payload, Token.SECRET_KEY, {
    expiresIn: Token.JWT_EXPIRE,
  });
};

export { generateToken };
