import { Router } from "express";
import { movieController } from "../controllers/index.js";
const { getMoviesList, getMovieDetail } = movieController;

const router = Router();

router.route("/").get(getMoviesList);
router.route("/:id").get(getMovieDetail);

export default router;
