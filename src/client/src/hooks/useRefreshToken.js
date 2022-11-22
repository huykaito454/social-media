import axios from "../api/axios";
import { authUpdateUser } from "../reducers/authSlice";
import { getToken } from "../utils/auth";

export default function useRefreshToken() {
  const refresh = async () => {
    const { refresh_token } = getToken();
    if (!refresh_token) return null;
    const res = await axios.post("/token", {
      "Content-Type": "application/json",
      refreshToken: refresh_token,
    });
    if (res.data) {
      authUpdateUser((state) => ({
        ...state,
        accessToken: res.data.accessToken,
      }));
    }
    return res.data.accessToken;
  };
  return refresh;
}
