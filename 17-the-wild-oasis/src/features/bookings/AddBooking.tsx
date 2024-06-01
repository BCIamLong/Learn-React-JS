import Button from "~/components/Button";
import Modal from "~/components/Modal";
import BookingForm from "./BookingForm";

export default function AddBooking() {
  return (
    <Modal>
      <Modal.Open opens="add-booking">
        <Button>Add new booking</Button>
      </Modal.Open>
      <Modal.Window name="add-booking">
        <BookingForm />
      </Modal.Window>
    </Modal>
  );
}
