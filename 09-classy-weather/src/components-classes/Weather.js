import React from "react";
import WeatherBox from "./WeatherBox";
import Loader from "./Loader";
import Search from "./Search";

class Weather extends React.Component {
  controller = new AbortController();
  state = { query: "", isLoading: false, weather: [], location: {} };

  // constructor(props) {
  //   super(props);
  //   // this.state = { query: "", isLoading: false, weather: [], location: {} };
  //   this.setQuery = this.setQuery.bind(this);
  //   this.setIsLoading = this.setIsLoading.bind(this);
  //   this.setWeather = this.setWeather.bind(this);
  //   this.setLocation = this.setLocation.bind(this);
  // }
  setLocation = (loc) => {
    // this.setState((curState) => {
    //   return { ...curState, country: c };
    // });
    this.setState({ location: loc });
  };

  setQuery = (q) => {
    // this.setState((curState) => {
    //   return { ...curState, query: q };
    // });
    this.setState({ query: q });
  };

  setIsLoading = (is) => {
    // this.setState((curState) => {
    //   return { ...curState, isLoading: is };
    // });
    this.setState({ isLoading: is });
  };

  setWeather = (newWeather) => {
    // this.setState((curState) => {
    //   return { ...curState, weather: newWeather };
    // });
    this.setState({ weather: newWeather });
  };

  fetchWeather = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "583953c4d0msh878ba482a8c2c60p11cf01jsn1088d773f453",
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
      if (err.name === "AbortError") return;
      alert(err);
    }
  };

  // async fetchWeather() {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "b9b6ebea93msh4b970af5ab1dc5cp13c490jsn5bfea61646e3",
  //       "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  //     },
  //     signal: this.controller.signal,
  //   };
  //   try {
  //     const res = await fetch(
  //       `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${this.state.query}&days=6`,
  //       options
  //     );
  //     const data = await res.json();
  //     this.setWeather(data.forecast?.forecastday);
  //     this.setLocation({
  //       city: data.location?.name,
  //       country: data.location?.country,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     if (err.name === "AbortError") return;
  //     alert(err);
  //   }
  // }
  componentDidMount() {
    // console.log("hello");
    if (localStorage.getItem("query")) {
      const q = JSON.parse(localStorage.getItem("query"));
      this.setQuery(q.location);
      // this.setLocation(data);
    }
  }

  async componentDidUpdate(_, prevState) {
    // console.log(prevState.query === this.state.query);
    if (prevState.query === this.state.query) return;
    this.setIsLoading(true);
    // console.log(prevState.query?.length);
    // console.log(prevState);
    if (this.state.query?.length < 3) {
      this.setIsLoading(false);
      return this.setWeather([]);
    }
    // console.log("hello");

    await this.fetchWeather();

    localStorage.setItem(
      "query",
      JSON.stringify({
        location: this.state.query,
      })
    );
    // console.log(data.forecast.forecastday);
    // this.setWeather([1, 2, 3]);
    this.setIsLoading(false);
  }

  render() {
    // console.log(this.state);
    return (
      <div className="weather-box">
        <h1 className="heading-primary">classy Weather</h1>
        <Search onSetQuery={this.setQuery} query={this.state.query} />
        {this.state.isLoading ? (
          <Loader />
        ) : this.state.weather?.length ? (
          <WeatherBox
            weather={this.state.weather}
            location={this.state.location}
            controller={this.controller}
          />
        ) : null}
      </div>
    );
  }
}

export default Weather;
