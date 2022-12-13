import axios from "../api/axios";
import { authUpdateUser } from "../sagas/auth/auth-slice";
import { getToken } from "../utils/auth";

export default function useRefreshToken() {
  const refresh = async () => {
    const { refresh_token } = getToken();
    if (!refresh_token) return null;
    const { data } = await axios.post("/token", {
      refreshToken: refresh_token,
    });
    if (data) {
      authUpdateUser((state) => ({
        ...state,
        accessToken: data.accessToken,
      }));
    }
    return res.data.accessToken;
  };
  return refresh;
}
