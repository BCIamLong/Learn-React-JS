import { Router } from "express";
import { watchedController } from "../controllers/index.js";
const {
  getWatchedList,
  getWatchedStats,
  createNewWatched,
  deleteWatched,
  getWatchedDetail,
} = watchedController;

const router = Router();

router.get("/stats", getWatchedStats);
router.route("/").get(getWatchedList).post(createNewWatched);
router.route("/:id").get(getWatchedDetail).delete(deleteWatched);

export default router;
