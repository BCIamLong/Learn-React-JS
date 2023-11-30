import Item from "./Item";

export default function List({ weather }) {
  return (
    <ul className="list">
      {weather.map((w, i) => (
        <Item key={i} data={w} />
      ))}
    </ul>
  );
}
