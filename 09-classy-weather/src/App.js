import React from "react";
import "./App.css";
import Weather from "./components/Weather";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <Weather />
      </div>
    );
  }
}

export default App;
