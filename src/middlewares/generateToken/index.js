import JWT from "jsonwebtoken";
import { Token } from "../../constants";

const generateToken = (payload) => {
  const { id, email, fullName, userName } = payload;
  console.log(payload);
  const accessToken = JWT.sign(
    { id, email, fullName, userName },
    Token.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30m",
    }
  );
  const refreshToken = JWT.sign(
    { id, email, fullName, userName },
    Token.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "48h",
    }
  );
  return { accessToken, refreshToken };
};

export { generateToken };
