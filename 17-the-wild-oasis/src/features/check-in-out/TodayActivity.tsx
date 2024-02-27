import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "~/components/Button";
import Flag from "~/components/Flag";
import Tag from "~/components/Tag";
import { Booking } from "~/types/booking.type";
import { CheckOutButton } from "./CheckOutButton";

const StyledTodayActivity = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 0.4fr 1.5fr 1fr 1.4fr;
  justify-content: start;
  align-items: start;

  column-gap: 1.6rem;
  align-items: center;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--color-grey-100);
  width: 100%;
  &:first-child {
    border-top: 1px solid var(--color-grey-100);
    padding-top: 1.2rem;
  }
`;

const Guest = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
`;

const Nights = styled.p`
  font-size: 1.2rem;
  text-transform: uppercase;
`;

export default function TodayActivity({ activity }: { activity: Booking }) {
  const {
    status,
    guests: { countryFlag, fullName },
    numNights,
    id,
  } = activity;
  return (
    <StyledTodayActivity>
      {status === "unconfirmed" ? <Tag $color="green">Arriving</Tag> : <Tag $color="blue">Departing</Tag>}
      <Flag src={countryFlag} />
      <Guest>{fullName}</Guest>
      <Nights>{numNights} nights</Nights>
      {status === "unconfirmed" ? (
        <Button $size="mini" as={Link} to={`/check-in/${id}`}>
          Check in
        </Button>
      ) : (
        <CheckOutButton bookingId={id} />
      )}
    </StyledTodayActivity>
  );
}
