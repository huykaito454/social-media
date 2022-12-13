import express from "express";
import * as userController from "../../controllers/userController";
import { verifyToken } from "../../middlewares/verifyToken";
const router = express.Router();
router.get("/profile", verifyToken, userController.profile);
export const userRoutes = router;
