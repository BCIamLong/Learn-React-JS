import Spinner from "~/components/Spinner";
import { useBooking } from "./useBooking";
import Row from "~/components/Row";
import Button from "~/components/Button";
import { useNavigate } from "react-router-dom";
import Tag from "~/components/Tag";
import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import { STATUS_COLORS } from "~/configs/constant";

const Heading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 1.2rem;
  button {
    font-size: 1.4rem;
    font-weight: 500;
  }
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
          <Tag $color={STATUS_COLORS[status]}>{status}</Tag>
        </Heading>
        <Button $variation="back" onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
      </Row>
      <Row>
        <BookingDataBox booking={booking} />
        <Buttons>
          {status === "unconfirmed" && <Button onClick={() => navigate(`/check-in/${id}`)}>Check in</Button>}
          <Button $variation="danger">Delete Booking</Button>
          <Button $variation="backV2" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Buttons>
      </Row>
    </>
  );
}
