import { useEffect, useRef } from "react";

export default function SearchBox({ query, onSetQuery }) {
  // useEffect(() => {
  //   const search = document.querySelector(".search-box");

  //   search.focus();
  //   // window.addEventListener("load", function (e) {
  //   // });
  // }, [query]);
  const inputSearch = useRef(null);

  useEffect(() => {
    // console.log(inputSearch.current);
    inputSearch.current.focus();
    const handleKeyEnter = (e) => {
      // console.log(e.key);
      if (e.key !== "Enter" || inputSearch.current === document.activeElement)
        return;
      onSetQuery("");
      // inputSearch.current.value = "";
      inputSearch.current.focus();
    };
    document.addEventListener("keydown", handleKeyEnter);

    return () => document.removeEventListener("keydown", handleKeyEnter);
  }, [onSetQuery]);

  return (
    <input
      className="search-box"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputSearch}
    />
  );
}
