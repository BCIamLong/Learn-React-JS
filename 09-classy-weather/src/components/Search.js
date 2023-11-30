import React from "react";

export default class Search extends React.Component {
  componentWillUnmount() {
    this.props.controller.abort();
  }
  render() {
    // console.log(this.props);
    return (
      <input
        className="search"
        type="text"
        value={this.props.query}
        placeholder="Search for location..."
        onChange={(e) => this.props.onSetQuery(e.target.value)}
      />
    );
  }
}
