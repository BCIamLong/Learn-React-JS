import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import store from "./store.js";
// import "./store.js";

// store.dispatch({ type: "account/deposit", payload: 600 });
// console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* we need to install the Redux react to make Redux and React connected and talked with each other
     * so the idea of redux is like the context API
     *we use Provider component from Redux and wrap the application or all the component need to access to the Redux store to make the capability to access to the store and manipulate with it
     *in Provider component we use store prop it likes the context prop in the context Provider to declare the store and available for access from components...
     *and now all the components in side the wrap of the Redux Provider can access to the Redux store
     */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
