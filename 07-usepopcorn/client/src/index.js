import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import StarRating from "./components/StarRating";

function Test() {
  const [moviesRating, setMoviesRating] = useState(0);
  return (
    <div>
      <StarRating color="green" onSetRating={setMoviesRating} />
      <p>This movie rated {moviesRating} starts</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      numStars={5}
      color="red"
      size={24}
      message={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />
    <StarRating />
    {/* <StarRating numStars={6} />
    <StarRating /> */}
    <Test />
  </React.StrictMode>
);
