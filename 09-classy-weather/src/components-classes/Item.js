import React from "react";

export default class Item extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  getWeatherIcon(wmoCode) {
    const icons = new Map([
      [[-100, 10], "☀️"],
      [[11, 20], "🌤"],
      [[21, 30], "⛅️"],
      [[31, 40], "☁️"],
      [[41, 50], "🌫"],
      [[51, 60], "🌦"],
      [[61, 70], "🌧"],
      [[71, 80], "🌨"],
      [[81, 90], "🌩"],
      [[91, 200], "⛈"],
    ]);
    const arr = [...icons.keys()].find(
      (key) => wmoCode >= key[0] && wmoCode < key[1]
    );
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  }

  render() {
    // this.getCountyCode();
    // console.log(this.props.data);
    // if (!this.props.data.day) return;
    const {
      data: { date, day },
    } = this.props;
    const { maxtemp_c: max, mintemp_c: min, avgtemp_f: avg } = day;
    // console.log(this.getWeatherIcon(Math.round(+avgtemp_f)));
    // console.log(this.props.data);
    // console.log(avgtemp_f);
    const dateFormat =
      new Date().getDay() === new Date(date).getDay()
        ? "Today"
        : new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
          });

    return (
      <li className="item">
        <p className="icon">{this.getWeatherIcon(Math.round(+avg))}</p>
        <p>{dateFormat}</p>
        <p>
          {Math.round(min)}&deg; -<strong> {Math.round(max)}&deg;</strong>
          {/* {Math.floor(min)}&deg;-{Math.ceil(max)}&deg; */}
        </p>
      </li>
    );
  }
}
