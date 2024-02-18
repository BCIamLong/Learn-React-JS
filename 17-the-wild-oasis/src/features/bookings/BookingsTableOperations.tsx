import styled from "styled-components";
import { Filter } from "~/components/Filter";
import SortBy from "~/components/SortBy";

const StyledOperations = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export default function BookingsTableOperations() {
  return (
    <StyledOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-in", label: "Checked in" },
          { value: "checked-out", label: "Checked out" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />
      <SortBy
        options={[
          { value: "createdAt-asc", label: "Sort by date (recent first)" },
          { value: "createdAt-dsc", label: "Sort by amount (earlier first)" },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
          { value: "totalPrice-dsc", label: "Sort by amount (high first)" },
        ]}
      />
    </StyledOperations>
  );
}
