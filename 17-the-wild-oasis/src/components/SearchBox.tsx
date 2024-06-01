import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

const StyledSearchBox = styled.div`
  display: flex;
  align-items: center;
  border: none;
  border-radius: var(--border-radius-md);
  width: 30rem;
  border: 1.5px solid var(--color-grey-200);
  color: inherit;
  background-color: var(--color-grey-0);
  /* padding-left: 1.2rem; */
  overflow: hidden;
  font-size: 1.4rem;
  svg {
    /* margin-top: 0.6rem; */
    font-size: 2rem;
    color: var(--color-grey-700);
  }
  &:focus-within {
    svg {
      color: var(--color-brand-600);
    }
    border: 1.5px solid var(--color-brand-500);
  }
`;

const StyledSearchInput = styled.input`
  padding: 0.8rem 1rem;
  border: none;
  /* border-radius: var(--border-radius-md); */
  width: 30rem;
  /* border: 1px solid var(--color-grey-200); */
  color: inherit;
  line-height: 1;
  background-color: var(--color-grey-0);

  &:focus {
    border: none;
    outline: none;
  }
`;

export default function SearchBox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  function handleClick() {
    if (!query) return;
    searchParams.set("search", query);
    setSearchParams(searchParams);
  }

  return (
    <StyledSearchBox>
      {/* <label htmlFor="search">
        <HiMagnifyingGlass />
      </label> */}
      <Button $variation="search" $size="small" onClick={handleClick}>
        <HiMagnifyingGlass />
      </Button>
      <StyledSearchInput
        value={query}
        type="text"
        id="search"
        placeholder={`Search for bookings`}
        onChange={(e) => setQuery(e.target.value)}
      />
    </StyledSearchBox>
  );
}
