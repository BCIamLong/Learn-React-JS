import React from "react";

export default class Search extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <input
        className="search"
        type="text"
        value={this.props.query}
        placeholder="Search for location..."
        onChange={this.props.onSetQuery}
      />
    );
  }
}
