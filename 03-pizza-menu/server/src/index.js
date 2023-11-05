import "dotenv/config";
import mongoose from "mongoose";

process.on("uncaughtException", (err) => {
  console.log(err);
});

import app from "./app.js";
import dbConfig from "./configs/db.config.js";

(async () => {
  try {
    await mongoose.connect(dbConfig.DB_LINK);
    console.log("Connect DB successfully");
  } catch (err) {
    console.log(err);
  }
})();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is listening with port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    console.log("Server is closing");
    process.exit();
  });
});
