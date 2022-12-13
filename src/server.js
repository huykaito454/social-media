import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth/index.js";
import { apiV1 } from "./routes/v1";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: true,
    exposedHeaders: ["Authorization"],
  })
);
app.use(express.urlencoded());
app.use(express.json());

authRoute(app);
app.use("/v1", apiV1);
let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});
