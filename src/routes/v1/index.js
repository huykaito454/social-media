import express from "express";
import { userRoutes } from "./user";
const router = express.Router();
router.use("/user", userRoutes);
export const apiV1 = router;
