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
}

export function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  // const queryClient = useQueryClient();
  const filterURL = searchParams.get(filterField) || "all";

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
