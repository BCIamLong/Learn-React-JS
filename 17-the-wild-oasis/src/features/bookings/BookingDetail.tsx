import Spinner from "~/components/Spinner";
import { useBooking } from "./useBooking";
import Row from "~/components/Row";
import Button from "~/components/Button";
import { useNavigate } from "react-router-dom";
import Tag from "~/components/Tag";
import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";

const Heading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
`;

export default function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { id, status } = booking || {};

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row $type="horizontal">
        <Heading>
          <h2>Booking #{id}</h2>
          <Tag $color="blue">{status}</Tag>
        </Heading>
        <Button $variation="back" onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
      </Row>
      <Row>
        <BookingDataBox booking={booking} />
      </Row>
    </>
  );
}
