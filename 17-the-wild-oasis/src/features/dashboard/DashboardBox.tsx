import Spinner from "~/components/Spinner";
import { useRecentBookings } from "./useRecentBookings";
import styled from "styled-components";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export default function DashboardBox() {
  const { isLoading: isLoading1, bookings } = useRecentBookings();
  const { isLoading: isLoading2, stays } = useRecentStays();

  if (isLoading1 || isLoading2) return <Spinner />;

  return (
    <StyledDashboardBox>
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardBox>
  );
}
