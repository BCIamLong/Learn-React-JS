// import Item from "./Item";
import Stats from "./Stats";

export default function List({ type, stats, children }) {
  return (
    <ul className="list">
      {type === "watched" && <Stats stats={stats} />}
      {children}
    </ul>
  );
}
