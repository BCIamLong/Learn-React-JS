import List from "./List";

export default function WeatherBox({ location, weather }) {
  const { city, country } = location;
  return (
    <div className="weather-list">
      <h2 className="heading-secondary">
        Weather for {city} {country} 🚩
      </h2>
      <List weather={weather} />
    </div>
  );
}
