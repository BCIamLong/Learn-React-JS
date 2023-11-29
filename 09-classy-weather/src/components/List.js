import React from "react";
import Item from "./Item";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    // this.props = { weather: [] };
    this.state = {};
  }
  render() {
    return (
      <ul className="list">
        {this.props.weather.map((w, i) => (
          <Item key={i} data={w} />
        ))}
      </ul>
    );
  }
}
