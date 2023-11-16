export default function SearchBox({ query, onSetQuery }) {
  return (
    <input
      className="search-box"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
    />
  );
}
