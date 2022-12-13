import express from "express";
import * as authController from "../../controllers/authController";
let router = express.Router();
let initRouteWeb = (server) => {
  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.post("/token", authController.token);
  return server.use("/", router);
};
export default initRouteWeb;
