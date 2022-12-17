import axios from "axios";
import { getToken } from "../utils/auth";
const { access_token } = getToken();
export const publicAxios = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
export const privateAxios = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});
