import { createContext, useContext, useMemo, useState } from "react";

const SearchQueryContext = createContext();

function SearchQueryProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  const value = useMemo(() => {
    return {
      searchQuery,
      setSearchQuery,
    };
  }, [searchQuery]);

  return (
    <SearchQueryContext.Provider
      value={value}
      // value={{
      //   searchQuery,
      //   setSearchQuery,
      // }}
    >
      {children}
    </SearchQueryContext.Provider>
  );
}

const useSearchQuery = () => {
  const context = useContext(SearchQueryContext);

  if (context === undefined)
    throw new Error(
      "You are using the SearchQueryContext outside the SearchQueryProvider!"
    );
  return context;
};

export { SearchQueryProvider, useSearchQuery };
