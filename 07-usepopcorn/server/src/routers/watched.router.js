import { Router } from "express";
import { watchedController } from "../controllers/index.js";
const { getWatchedList, getWatchedStats } = watchedController;

const router = Router();

router.route("/").get(getWatchedList);
router.get("/stats", getWatchedStats);

export default router;
