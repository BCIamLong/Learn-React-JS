import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routers/index.js";

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.options("*", cors());
app.use(cors());
app.use(bodyParser.json({ limit: "90kb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

export default app;
