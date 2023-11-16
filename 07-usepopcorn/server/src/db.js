import { dbConfig } from "./configs/index.js";
import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(dbConfig.db_link);
    console.log("Connect DB successfully");
  } catch (error) {
    console.log(error);
  }
})();
