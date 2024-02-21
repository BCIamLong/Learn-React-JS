import { HiArrowDownOnSquare, HiEllipsisVertical, HiMiniEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "~/components/Button";
import Menus from "~/components/Menus";
import Table from "~/components/Table";
import { Booking } from "~/types/booking.type";
import { formatDate, getDistanceDates, getTimeAfterCreatedAt } from "~/utils/dateUtils";
import formatCurrency from "~/utils/formatCurrency";

interface BookingRowProps {
  booking: Booking;
}

const Cabin = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-grey-500);
  letter-spacing: 1px;
`;

interface Status {
  $color: string;
}

const Status = styled.p<Status>`
  display: inline-block;
  padding: 0.6rem 1rem;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-${(props) => props.$color}-100);
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-${(props) => props.$color}-700);
  line-height: 1;
`;

const Price = styled.p`
  font-size: 1.4rem;
  font-family: "Sono", sans-serif;
  font-weight: 500;
`;

const Date = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  /* font-weight: 500; */
`;
// const Time = styled.p``;

const Email = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-500);
`;

const Guest = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.8rem 0;

  & p {
    /* font-size: 1.6rem; */
    font-weight: 500;
  }
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.8rem 0;

  & p {
    /* font-size: 1.6rem; */
    font-weight: 500;
  }
`;

const StyledHiEllipsisVertical = styled(HiEllipsisVertical)`
  font-size: 2.4rem;
  font-weight: 700;

  &:active.div {
    display: block;
  }
`;

const colors = {
  "checked-out": "silver",
  "checked-in": "yellow",
  unconfirmed: "blue",
};

export default function BookingRow({ booking }: BookingRowProps) {
  const navigate = useNavigate();
  return (
    <Table.Row>
      <div></div>
      <div>
        <Cabin>{booking?.cabins?.name}</Cabin>
      </div>
      <Guest>
        <p>{booking?.guests?.fullName}</p>
        <Email>{booking?.guests?.email}</Email>
      </Guest>
      <DateBox>
        <p>
          <span>{getTimeAfterCreatedAt(booking.createdAt)}</span>
          <span> &rarr; </span>
          <span>{getDistanceDates(booking.startDate, booking.endDate)}</span>
        </p>
        <Date>
          <span>{formatDate(booking.startDate)}</span>
          <span> &mdash; </span>
          <span>{formatDate(booking.endDate)}</span>
        </Date>
      </DateBox>
      <div>
        <Status $color={colors[booking.status]}>{booking.status}</Status>
      </div>
      <div>
        <Price>{formatCurrency(booking.totalPrice)}</Price>
      </div>
      <Menus.Menu>
        <Menus.Toggle id={booking.id}>
          <Button $size="tiny" $variation="option">
            <StyledHiEllipsisVertical />
          </Button>
        </Menus.Toggle>

        <Menus.Box id={booking.id}>
          <Menus.Button onClick={() => navigate(`/bookings/${booking.id}`)}>
            <HiMiniEye />
            <span>See detail</span>
          </Menus.Button>
          {booking.status === "unconfirmed" && (
            <Menus.Button onClick={() => navigate(`/check-in/${booking.id}`)}>
              <HiArrowDownOnSquare />
              <span>Check in</span>
            </Menus.Button>
          )}
          <Menus.Button>
            <HiTrash />
            <span>Delete booking</span>
          </Menus.Button>
        </Menus.Box>
      </Menus.Menu>
    </Table.Row>
  );
}
