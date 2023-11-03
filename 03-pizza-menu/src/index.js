// * so we will create the first file in src where development related the most
// * so it should be called index.js because the webpack module bundler in this project expects the entry point to be called index.js

import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// *App is main component
// *component named convention: pascal case name NameName

function App() {
  return <h1>Hello World!</h1>;
}

// *This is way we render the root or basically render the our app in the DOM in react version 18
// * get HTML div container #root
const container = document.getElementById("root");

// * convert to react root by use ReactDOM
const root = ReactDOM.createRoot(container);

// * render component JSX to HTML to inside this root block container with strict mode
// ! instead render directly the App component as the root component root.render(<App />)
//* we can run it inside the StrictMode component
// * and StrictMode not really a big deal the things it does that's during development it will render our components twice in order to find certain bug and also react will check if we're using outdated parts of react API
// * so strict mode not groundbreaking but it's still good ideal to always activate it when we develop react application
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// * Before version 18 react

React.render(<App />);
// and ReactDOM from 'react-dom';
