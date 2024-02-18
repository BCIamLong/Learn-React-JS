import Row from "~/components/Row";
import BookingsTable from "~/features/bookings/BookingsTable";

function Bookings() {
  return (
    <>
      <Row>
        <h2>Bookings</h2>
      </Row>
      <Row>
        <BookingsTable />
      </Row>
    </>
  );
}

export default Bookings;
