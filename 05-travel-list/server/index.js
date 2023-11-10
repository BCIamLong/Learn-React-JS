import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

(async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL);
    console.log("Connect DB successfully");
  } catch (err) {
    console.log(err);
  }
})();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is listening with port ${port}`);
});
