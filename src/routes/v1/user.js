import express from "express";
import * as userController from "../../controllers/userController";
import { verifyToken } from "../../middlewares/verifyToken";
const router = express.Router();
router.get("/profile", verifyToken, userController.profile);
router.post("/update-avatar", verifyToken, userController.updateAvatar);
router.post("/update-background", verifyToken, userController.updateBackground);
export const userRoutes = router;
