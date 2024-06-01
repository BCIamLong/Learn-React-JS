import Row from "~/components/Row";
import SearchBox from "~/components/SearchBox";
import AddBooking from "~/features/bookings/AddBooking";
import BookingsTable from "~/features/bookings/BookingsTable";
import BookingsTableOperations from "~/features/bookings/BookingsTableOperations";

function Bookings() {
  return (
    <>
      <Row $type="horizontal">
        <h2>Bookings</h2>
        <AddBooking />
      </Row>
      <Row $type="horizontal">
        <SearchBox />
        <BookingsTableOperations />
      </Row>
      <Row>
        <BookingsTable />
      </Row>
    </>
  );
}

export default Bookings;
