import Button from "~/components/Button";
import Modal from "~/components/Modal";
import CabinForm from "./CabinForm";

export function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button $size="medium">Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CabinForm />
      </Modal.Window>
    </Modal>
  );
}
