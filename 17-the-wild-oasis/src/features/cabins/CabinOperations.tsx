import styled from "styled-components";
import { Filter } from "~/components/Filter";
import SortBy from "~/components/SortBy";

const StyledOperations = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export default function CabinOperations() {
  return (
    <StyledOperations>
      <Filter
        filterField="filter"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "", label: "Sort" },
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-dsc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low first)" },
          { value: "regularPrice-dsc", label: "Sort by price (hight first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-dsc", label: "Sort by capacity (high first)" },
        ]}
      />
    </StyledOperations>
  );
}
