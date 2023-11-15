import "dotenv/config";

//* so this error handle seem is not necessary because nowadays we have many tools discover when we write code like Eslint therefore this code might not necessary but to ensure we also need include it
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Application is shutting down");
  process.exit();
});

import "./db.js";
import app from "./app.js";

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    console.log("Application is shutting down");
    process.exit();
  });
});
