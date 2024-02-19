import Table from "~/components/Table";
import { useBookings } from "./useBookings";
import Spinner from "~/components/Spinner";
import BookingRow from "./BookingRow";
import { Booking } from "~/types/booking.type";
import Pagination from "~/components/Pagination";
// import { useSearchParams } from "react-router-dom";

export default function BookingsTable() {
  // const [searchParams] = useSearchParams();
  // const filter = searchParams.get("filter") || "";
  const { isLoading, bookings } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <p>We don't have data yet</p>;

  return (
    <Table columns="0.3fr 1fr 2.5fr 3.5fr 2fr 1.5fr 0.8fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>
      <Table.Body<Booking> data={bookings} render={(booking) => <BookingRow key={booking.id} booking={booking} />} />
      <Table.Footer>
        <Pagination count={11} />
      </Table.Footer>
    </Table>
  );
}
