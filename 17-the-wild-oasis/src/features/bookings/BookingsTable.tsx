import Table from "~/components/Table";
import { useBookings } from "./useBookings";
import Spinner from "~/components/Spinner";
import BookingRow from "./BookingRow";
import { Booking } from "~/types/booking.type";

export default function BookingsTable() {
  const { isLoading, bookings } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <p>We don't have data yet</p>;

  return (
    <Table columns="0.3fr 1fr 3fr 3fr 2fr 2fr 0.8fr">
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
    </Table>
  );
}
