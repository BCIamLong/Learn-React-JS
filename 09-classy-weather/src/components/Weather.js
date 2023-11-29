import React from "react";
import WeatherBox from "./WeatherBox";
import Loader from "./Loader";

class Weather extends React.Component {
  controller = new AbortController();

  constructor(props) {
    super(props);
    this.state = { query: "", isLoading: false, weather: [], location: {} };
    this.setQuery = this.setQuery.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
    this.setWeather = this.setWeather.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }
  setLocation(loc) {
    // this.setState((curState) => {
    //   return { ...curState, country: c };
    // });
    this.setState({ location: loc });
  }

  setQuery(q) {
    // this.setState((curState) => {
    //   return { ...curState, query: q };
    // });
    this.setState({ query: q });
  }

  setIsLoading(is) {
    // this.setState((curState) => {
    //   return { ...curState, isLoading: is };
    // });
    this.setState({ isLoading: is });
  }

  setWeather(newWeather) {
    // this.setState((curState) => {
    //   return { ...curState, weather: newWeather };
    // });
    this.setState({ weather: newWeather });
  }

  async fetchWeather() {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b9b6ebea93msh4b970af5ab1dc5cp13c490jsn5bfea61646e3",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
      signal: this.controller.signal,
    };
    try {
      const res = await fetch(
        `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${this.state.query}&days=6`,
        options
      );
      const data = await res.json();
      this.setWeather(data.forecast?.forecastday);
      this.setLocation({
        city: data.location?.name,
        country: data.location?.country,
      });
    } catch (err) {
      console.log(err);
      if (err.name === "AbortError") return;
      alert(err);
    }
  }

  async componentDidUpdate(_, prevState) {
    if (prevState.query === this.state.query) return;
    this.setIsLoading(true);
    // console.log(prevState.query?.length);
    if (prevState.query?.length < 4) {
      this.setIsLoading(false);
      return this.setWeather([]);
    }

    await this.fetchWeather();

    // console.log(data.forecast.forecastday);
    // this.setWeather([1, 2, 3]);
    this.setIsLoading(false);
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  render() {
    return (
      <div className="weather-box">
        <h1 className="heading-primary">classy Weather</h1>
        <input
          className="search"
          type="text"
          value={this.state.query}
          placeholder="Search for location..."
          onChange={(e) => this.setQuery(e.target.value)}
        />
        {this.state.isLoading ? (
          <Loader />
        ) : this.state.weather?.length ? (
          <WeatherBox
            weather={this.state.weather}
            location={this.state.location}
          />
        ) : null}
      </div>
    );
  }
}

export default Weather;