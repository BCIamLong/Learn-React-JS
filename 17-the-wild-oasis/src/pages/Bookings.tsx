import Row from "~/components/Row";
import BookingsTable from "~/features/bookings/BookingsTable";
import BookingsTableOperations from "~/features/bookings/BookingsTableOperations";

function Bookings() {
  return (
    <>
      <Row $type="horizontal">
        <h2>Bookings</h2>
        <BookingsTableOperations />
      </Row>
      <Row>
        <BookingsTable />
      </Row>
    </>
  );
}

export default Bookings;
