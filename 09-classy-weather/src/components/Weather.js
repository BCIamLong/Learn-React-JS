import { useEffect, useState } from "react";
import Search from "./Search";
import Loader from "./Loader";
import WeatherBox from "./WeatherBox";

export default function Weather() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState([]);
  const [location, setLocation] = useState({});

  useEffect(() => {
    if (localStorage.getItem("query")) {
      const q = JSON.parse(localStorage.getItem("query"));
      setQuery(q.location);
      //setLocation(data);
    }
  }, []);

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();

    async function fetchWeather() {
      setIsLoading(true);

      if (query.length < 3) {
        setIsLoading(false);
        return setWeather([]);
      }
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "583953c4d0msh878ba482a8c2c60p11cf01jsn1088d773f453",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
        signal: controller.signal,
      };
      try {
        const res = await fetch(
          `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${query}&days=6`,
          options
        );

        const data = await res.json();
        setWeather(data.forecast?.forecastday);
        setLocation({
          city: data.location?.name,
          country: data.location?.country,
        });
        setIsLoading(false);
      } catch (err) {
        if (err.name === "AbortError") return;
        alert(err);
      }
    }

    fetchWeather();

    localStorage.setItem(
      "query",
      JSON.stringify({
        location: query,
      })
    );
    // setIsLoading(false);
    return () => controller.abort();
  }, [query]);

  return (
    <div className="weather-box">
      <h1 className="heading-primary">classy Weather</h1>
      <Search onSetQuery={setQuery} query={query} />
      {isLoading ? (
        <Loader />
      ) : weather?.length ? (
        <WeatherBox weather={weather} location={location} />
      ) : null}
    </div>
  );
}
