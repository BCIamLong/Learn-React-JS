import { watchedService } from "../services/index.js";
const { getWatched, getStats, createWatched, removeWatched, getAWatched } =
  watchedService;

const getWatchedList = async (req, res) => {
  try {
    const watched = await getWatched();

    res.json({
      status: "success",
      data: {
        watched,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getWatchedDetail = async (req, res) => {
  try {
    const watched = await getAWatched(req.params.id);

    res.json({
      status: "success",
      data: {
        watched,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const createNewWatched = async (req, res) => {
  try {
    const newWatched = await createWatched(req.body);

    res.status(201).json({
      status: "success",
      data: {
        newWatched,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getWatchedStats = async (req, res) => {
  try {
    const stats = await getStats();

    res.json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteWatched = async (req, res) => {
  try {
    await removeWatched(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

export default {
  getWatchedList,
  getWatchedStats,
  createNewWatched,
  deleteWatched,
  getWatchedDetail,
};
