import Heading from "./Heading";
import Result from "./Result";
import SearchBox from "./SearchBox";

export default function Header({ query, onSetQuery, movies }) {
  return (
    <header className="header">
      <Heading />
      <SearchBox query={query} onSetQuery={onSetQuery} />
      <Result movies={movies} />
    </header>
  );
}
