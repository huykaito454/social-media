import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import webRoute from "./routes/web.js";
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

webRoute(app);

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});
