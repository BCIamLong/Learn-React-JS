import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Spinner from "~/components/Spinner";
import Row from "~/components/Row";
import Button from "~/components/Button";
import Tag from "~/components/Tag";

import BookingDataBox from "./BookingDataBox";
import { STATUS_COLORS } from "~/configs/constant";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "~/components/Modal";
import { ConfirmDelete } from "~/components/ConfirmDelete";
// import { HiArrowUpOnSquare } from "react-icons/hi2";

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

type Status = "checked-out" | "checked-in" | "unconfirmed";

export default function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { id, status }: { id: number; status: Status } = booking || {};
  const { checkOut, isCheckingOut } = useCheckOut();
  const { isDeleting, deleteBooking } = useDeleteBooking();

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
          {status === "checked-in" && (
            <Button onClick={() => checkOut(id)} disabled={isCheckingOut}>
              Check out
            </Button>
          )}
          <Modal>
            <Modal.Open opens="delete-booking">
              <Button $variation="danger" disabled={isDeleting} onClick={() => deleteBooking(id)}>
                {isDeleting ? "Deleting" : "Delete Booking"}
              </Button>
            </Modal.Open>
            <Modal.Window name="delete-booking">
              <ConfirmDelete recourseName="booking" disabled={isDeleting} onConfirm={() => deleteBooking(id)} />
            </Modal.Window>
          </Modal>

          <Button $variation="backV2" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Buttons>
      </Row>
    </>
  );
}
