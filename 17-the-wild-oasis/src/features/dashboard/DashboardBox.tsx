import Spinner from "~/components/Spinner";
import { useRecentBookings } from "./useRecentBookings";
import styled from "styled-components";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";

const StyledDashboardBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr 1.2fr;
  column-gap: 2rem;
`;

export default function DashboardBox() {
  const { isLoading: isLoading1, bookings } = useRecentBookings();
  const { isLoading: isLoading2, confirmedStays, numDays } = useRecentStays();
  const { isLoading: isLoading3, cabins } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardBox>
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} numCabins={cabins?.length || 0} />
    </StyledDashboardBox>
  );
}
