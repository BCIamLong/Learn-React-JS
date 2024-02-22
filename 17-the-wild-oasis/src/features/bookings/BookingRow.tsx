import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEllipsisVertical, HiMiniEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "~/components/Button";
import Menus from "~/components/Menus";
import Table from "~/components/Table";
import { Booking } from "~/types/booking.type";
import { formatDate, getDistanceDates, getTimeAfterCreatedAt } from "~/utils/dateUtils";
import formatCurrency from "~/utils/formatCurrency";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "~/components/Modal";
import { ConfirmDelete } from "~/components/ConfirmDelete";

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
  const { checkOut, isCheckingOut } = useCheckOut();
  const { id, status } = booking;
  const { isDeleting, deleteBooking } = useDeleteBooking();
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
        <Status $color={colors[status]}>{status}</Status>
      </div>
      <div>
        <Price>{formatCurrency(booking.totalPrice)}</Price>
      </div>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id}>
            <Button $size="tiny" $variation="option">
              <StyledHiEllipsisVertical />
            </Button>
          </Menus.Toggle>

          <Menus.Box id={id}>
            <Menus.Button onClick={() => navigate(`/bookings/${id}`)}>
              <HiMiniEye />
              <span>See detail</span>
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button onClick={() => navigate(`/check-in/${id}`)}>
                <HiArrowDownOnSquare />
                <span>Check in</span>
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button onClick={() => checkOut(id)} disabled={isCheckingOut}>
                <HiArrowUpOnSquare />
                <span>Check out</span>
              </Menus.Button>
            )}
            <Modal.Open opens="delete-booking">
              <Menus.Button>
                <HiTrash />
                <span>Delete Booking</span>
              </Menus.Button>
            </Modal.Open>
          </Menus.Box>
          <Modal.Window name="delete-booking">
            <ConfirmDelete recourseName="booking" disabled={isDeleting} onConfirm={() => deleteBooking(id)} />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}
