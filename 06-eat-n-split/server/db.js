import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL);
    console.log("Connect DB successfully");
  } catch (err) {
    console.log(err);
  }
})();
