import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useBooking } from "../bookings/useBooking";
import BookingDataBox from "../bookings/BookingDataBox";

import Spinner from "~/components/Spinner";
import Row from "~/components/Row";
import Button from "~/components/Button";
import Tag from "~/components/Tag";
import Checkbox from "~/components/Checkbox";
import formatCurrency from "~/utils/formatCurrency";
import { useState } from "react";
import { useCheckIn } from "./useCheckIn";

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
  margin-top: 2rem;
  button {
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

export default function CheckInBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { id, status, guests, totalPrice } = booking || {};
  const { checkIn, isCheckingIn } = useCheckIn();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row $type="horizontal">
        <Heading>
          <h2>Check in booking #{id}</h2>
          <Tag $color="blue">{status}</Tag>
        </Heading>
        <Button $variation="back" onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
      </Row>
      <Row>
        <BookingDataBox booking={booking} />
        <Checkbox
          onChange={() => setConfirmedPaid(true)}
          checked={confirmedPaid || isCheckingIn}
          label={`I confirm that ${guests?.fullName} has paid the total amount of ${formatCurrency(totalPrice)}`}
          id={id}
        />

        <Buttons>
          <Button disabled={!confirmedPaid || isCheckingIn} onClick={() => checkIn(id)}>
            Check in booking #{id}
          </Button>
          <Button $variation="backV2" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Buttons>
      </Row>
    </>
  );
}
