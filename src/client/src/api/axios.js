import axios from "axios";
export const publicAxios = axios.create({
  baseURL: "http://localhost:8080",
});
export const privateAxios = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
