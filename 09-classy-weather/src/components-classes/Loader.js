import React from "react";

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <p className="loader">Loading...</p>;
  }
}
