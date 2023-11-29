import React from "react";
import "./App.css";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClickSubtract = this.handleClickSubtract.bind(this);
    this.handleClickPlug = this.handleClickPlug.bind(this);
  }

  handleClickSubtract() {
    // console.log(this);
    // this.setState({
    //   count: this.state.count - 1,
    // });
    this.setState((curState) => {
      return { ...curState, count: curState.count - 1 };
    });
  }
  handleClickPlug() {
    // this.setState({
    //   count: this.state.count + 1,
    // });

    this.setState((curState) => {
      return { ...curState, count: curState.count + 1 };
    });
  }

  render() {
    const date = new Date();
    date.setDate(date.getDay() + this.state.count);

    return (
      <div className="container">
        <button onClick={this.handleClickSubtract}>-</button>
        <span>
          {date.toLocaleDateString("es-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </span>
        <span> {this.state.count}</span>
        <button onClick={this.handleClickPlug}>+</button>
      </div>
    );
  }
}

export default Counter;
