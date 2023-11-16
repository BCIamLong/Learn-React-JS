import { Router } from "express";
import { movieController } from "../controllers/index.js";
const { getMoviesList } = movieController;

const router = Router();

router.route("/").get(getMoviesList);

export default router;
