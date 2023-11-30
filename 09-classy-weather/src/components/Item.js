export default function Item({ data }) {
  const {
    day: { maxtemp_c: max, mintemp_c: min, avgtemp_f: avg },
    date,
  } = data;
  const dateFormat =
    new Date().getDay() === new Date(date).getDay()
      ? "Today"
      : new Date(date).toLocaleDateString("en-US", {
          weekday: "short",
        });

  function getWeatherIcon(wmoCode) {
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

  return (
    <li className="item">
      <p className="icon">{getWeatherIcon(Math.round(+avg))}</p>
      <p>{dateFormat}</p>
      <p>
        {Math.round(min)}&deg; -<strong> {Math.round(max)}&deg;</strong>
        {/* {Math.floor(min)}&deg;-{Math.ceil(max)}&deg; */}
      </p>
    </li>
  );
}
