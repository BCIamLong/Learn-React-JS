import { Router } from "express";
import { getPizzaList } from "../controllers/pizza.controller.js";

const router = Router();

router.get("/", getPizzaList);

export default router;
