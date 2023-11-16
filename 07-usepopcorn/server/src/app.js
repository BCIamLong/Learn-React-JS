import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routers/index.js";

const app = express();

app.use(morgan("dev"));
app.options("*", cors());
app.use(cors());

app.use(router);

export default app;
