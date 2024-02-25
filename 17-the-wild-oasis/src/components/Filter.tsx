import styled from "styled-components";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";
import { MouseEvent } from "react";
// import { useQueryClient } from "@tanstack/react-query";

const StyledFilter = styled.div`
  display: flex;
  gap: 0.8rem;
  background-color: var(--color-grey-0);
  padding: 0.6rem 1rem;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);

  & button {
    font-size: 1.4rem;
    line-height: 1;
    font-weight: 500;
  }

  & button:visited {
    background-color: var(--color-brand-600);
    color: var(--color-grey-0);
  }
`;

interface FilterProps {
  filterField: string;
  options: { value: string; label: string }[];
  defaultFilter?: string;
}

export function Filter({ filterField, options, defaultFilter }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  // const queryClient = useQueryClient();
  const filterURL = searchParams.get(filterField) || defaultFilter || "all";
  if (searchParams.get("page")) searchParams.set("page", "1"); //* we don't need use setSearchParams function because filter only work when we click and when we click we call the handleClick function which also call the setSearchParams function right

  function handleClick(value: string) {
    return (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      //   searchParams.set("filter", value);
      // queryClient.invalidateQueries({ queryKey: ["bookings"] });
      searchParams.set(filterField, value);
      setSearchParams(searchParams);
    };
  }

  return (
    <StyledFilter>
      {options.map((op) => {
        const { value, label } = op;
        return (
          <Button
            key={value}
            $active={value === filterURL}
            disabled={value === filterURL}
            $size="small"
            $variation="filter"
            onClick={handleClick(value)}
          >
            {label}
          </Button>
        );
      })}

      {/* <Button $size="small" $variation="filter" onClick={handleClick("all")}>
        All
      </Button>
      <Button $size="small" $variation="filter" onClick={handleClick("no-discount")}>
        No discount
      </Button>
      <Button $size="small" $variation="filter" onClick={handleClick("with-discount")}>
        With discount
      </Button> */}
    </StyledFilter>
  );
}
