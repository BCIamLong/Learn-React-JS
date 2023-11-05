import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import pizzaRouter from "./routers/pizza.router.js";

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/pizza", pizzaRouter);

export default app;
