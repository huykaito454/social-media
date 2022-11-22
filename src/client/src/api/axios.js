const { default: axios } = require("axios");
export default axios.create({
  baseURL: "http://localhost:8000",
});
export const privateAxios = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
