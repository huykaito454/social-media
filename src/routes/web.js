import express from "express";
import * as authController from "../controllers/authController";
let router = express.Router();
let initRouteWeb = (server) => {
  router.post("/register", authController.register);
  router.post("/login", authController.login);
  return server.use("/", router);
};
export default initRouteWeb;
