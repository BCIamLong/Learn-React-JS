import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import StarRating from "./components/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating numStars={10} />
    {/* <StarRating numStars={6} />
    <StarRating /> */}
  </React.StrictMode>
);
