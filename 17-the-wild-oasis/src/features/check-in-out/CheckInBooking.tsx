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
import useSettings from "../settings/useSettings";

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
  const [wantBreakfast, setWantBreakfast] = useState(false);
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { id, status, guests, totalPrice, hasBreakfast, numGuests, numNights } = booking || {};
  const { checkIn, isCheckingIn } = useCheckIn();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const extrasPrice = settings?.breakfastPrice * numGuests * numNights;

  function handleCheckIn() {
    if (wantBreakfast)
      return checkIn({
        bookingId: id,
        breakfastData: { hasBreakfast: true, extrasPrice, totalPrice: totalPrice + extrasPrice },
      });
    checkIn({ bookingId: id, breakfastData: {} });
  }

  if (isLoading || isLoadingSettings) return <Spinner />;

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

        {!hasBreakfast && (
          <Checkbox
            onChange={() => {
              setWantBreakfast((has) => !has);
              setConfirmedPaid(false);
            }}
            checked={wantBreakfast}
            label={`Want to add breakfast for ${formatCurrency(extrasPrice)}?`}
            id={id}
          />
        )}

        <Checkbox
          onChange={() => setConfirmedPaid(true)}
          checked={confirmedPaid || isCheckingIn}
          disabled={confirmedPaid || isCheckingIn}
          label={`I confirm that ${guests?.fullName} has paid the total amount of ${
            wantBreakfast
              ? `${formatCurrency(totalPrice + extrasPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(
                  extrasPrice
                )})`
              : formatCurrency(totalPrice)
          }`}
          id={id}
        />

        <Buttons>
          <Button disabled={!confirmedPaid || isCheckingIn} onClick={handleCheckIn}>
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
