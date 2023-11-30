import React from "react";
import List from "./List";

class WeatherBox extends React.Component {
  constructor(props) {
    super(props);
    // this.props = { weather: [] };
    this.state = {};
  }

  componentWillUnmount() {
    // this.props.controller.abort();
    console.log("Will unmount");
  }
  compo;
  render() {
    const {
      location: { city, country },
      weather,
    } = this.props;
    // console.log(this.props.weather);

    return (
      <div className="weather-list">
        <h2 className="heading-secondary">
          Weather for {city} {country} 🚩
        </h2>
        <List weather={weather} />
      </div>
    );
  }
}

export default WeatherBox;
