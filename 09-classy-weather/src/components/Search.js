export default function Search({ query, onSetQuery }) {
  return (
    <input
      className="search"
      type="text"
      value={query}
      placeholder="Search for location..."
      onChange={(e) => onSetQuery(e.target.value)}
    />
  );
}
