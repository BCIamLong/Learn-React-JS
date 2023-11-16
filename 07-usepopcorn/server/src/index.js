import "dotenv/config";
import app from "./app.js";
import "./db.js";

const port = process.env.PORT || 3100;

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
