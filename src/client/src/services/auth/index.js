import { publicAxios } from "../../api/axios";

export const requestAuthRegister = (data) => {
  return publicAxios.post("/register", { ...data });
};
export const requestAuthLogin = (data) => {
  return publicAxios.post("/login", { ...data });
};
export const requestAuthGetUser = (token) => {
  if (!token) return;
  return publicAxios.get("/v1/user/profile", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const requestAuthRefreshToken = (data) => {
  return publicAxios.post("/token", { ...data });
};
