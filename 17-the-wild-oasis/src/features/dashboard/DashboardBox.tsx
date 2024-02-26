import Spinner from "~/components/Spinner";
import { useRecentBookings } from "./useRecentBookings";
import styled from "styled-components";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";

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
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} numCabins={cabins?.length || 0} />
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardBox>
  );
}
