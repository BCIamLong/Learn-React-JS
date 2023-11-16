import Item from "./Item";
import Stats from "./Stats";

export default function List({ type, data, stats }) {
  return (
    <ul className="list">
      {type === "watched" && <Stats stats={stats} />}
      {data?.map((dt) => (
        <Item type={type} item={dt} key={dt._id} />
      ))}
    </ul>
  );
}
