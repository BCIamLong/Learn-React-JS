import { Router } from "express";
import movieRouter from "./movie.router.js";
import watchedRouter from "./watched.router.js";
const router = Router();

router.use("/api/v1/movies", movieRouter);
router.use("/api/v1/watched", watchedRouter);

export default router;
