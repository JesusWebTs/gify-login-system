import config from "./config.js";
import express from "express";
import bodyParse from "body-parser";
import userRouter from "./routes/userRouter.js";
import "./models/_conn.js";
import cors from "cors";

const { server } = config;
// Init
const app = express();
// Settings
app.set("PORT", server.PORT).set("HOST", server.HOST);
// Midlewares
app.use(bodyParse.json()).use(bodyParse.urlencoded({ extended: true }));
app.use(cors());
// Routers
app.use("/api", userRouter);

// Export
export { app };
