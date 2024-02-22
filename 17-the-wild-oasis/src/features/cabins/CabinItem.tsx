// import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { HiEllipsisVertical, HiPencil, HiMiniTrash, HiMiniSquare2Stack } from "react-icons/hi2";

import useDeleteCabin from "./useDeleteCabin";
import Cabin from "~/types/cabin.type";
import formatCurrency from "~/utils/formatCurrency";
import Button from "~/components/Button";
import CabinForm from "./CabinForm";
import useCreateCabin from "./useCreateCabin";
import toast from "react-hot-toast";
import Modal from "~/components/Modal";
import { ConfirmDelete } from "~/components/ConfirmDelete";
import Table from "~/components/Table";
import Menus from "~/components/Menus";

const Image = styled.img`
  width: 70%;
`;

const Name = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-grey-500);
  letter-spacing: 1px;
`;

const RegularPrice = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.8px;
`;

interface Discount {
  $isExist?: boolean;
}

const Discount = styled.p<Discount>`
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.8px;
  color: var(--color-green-700);

  ${(props) =>
    !props.$isExist &&
    css`
      font-size: 1.4rem;
      color: inherit;
    `}
`;

const StyledHiEllipsisVertical = styled(HiEllipsisVertical)`
  font-size: 2.4rem;
  font-weight: 700;

  &:active.div {
    display: block;
  }
`;

// const Options = styled.button``;

interface CabinItemProps {
  cabin: Cabin;
}

function CabinItem({ cabin }: CabinItemProps) {
  // const { handlers } = useToaster();
  // const { startPause, endPause } = handlers;
  // const [isConfirm, setIsConfirm] = useState(false);
  const { isDeleting, deleteCabinMutate } = useDeleteCabin();
  const { isCreating, createCabinMutate } = useCreateCabin();

  const { name, maxCapacity, regularPrice, discount, description, image } = cabin;

  function handleDuplicateCabin() {
    const newCabinData = {
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    };
    createCabinMutate(newCabinData, {
      onSuccess: () => {
        toast.success("Duplicate cabin successful");
      },
    });
  }
  return (
    <>
      <Table.Row>
        <div>
          <Image src={cabin.image} alt={`The Wild Oasis's Cabin ${cabin.name}`} />
        </div>
        <div>
          <Name>{cabin.name}</Name>
        </div>
        <div>
          <p>Fits up {cabin.maxCapacity} guests</p>
        </div>
        <div>
          <RegularPrice>{formatCurrency(cabin.regularPrice)}</RegularPrice>
        </div>
        <div>
          {cabin.discount ? (
            <Discount $isExist={true}>{formatCurrency(cabin.discount)}</Discount>
          ) : (
            <Discount $isExist={false}>&mdash;</Discount>
          )}
        </div>
        <Menus.Menu>
          <Menus.Toggle id={cabin.id}>
            <Button $size="tiny" $variation="option">
              <StyledHiEllipsisVertical />
            </Button>
          </Menus.Toggle>

          <Modal>
            <Menus.Box id={cabin.id}>
              <Menus.Button disabled={isCreating} onClick={handleDuplicateCabin}>
                <HiMiniSquare2Stack />
                <span>{isCreating ? "Duplicating" : "Duplicate"}</span>
              </Menus.Button>

              <Modal.Open opens="edit-form">
                <Menus.Button>
                  <HiPencil />
                  <span>Edit</span>
                </Menus.Button>
                {/* <button>
                  <HiPencil />
                  <span>Edit</span>
                </button> */}
              </Modal.Open>

              <Modal.Open opens="confirm-box">
                <Menus.Button disabled={isDeleting}>
                  <HiMiniTrash />
                  <span>Delete</span>
                </Menus.Button>
                {/* <button disabled={isDeleting}>
                  <HiMiniTrash />
                  <span>Delete</span>
                </button> */}
              </Modal.Open>
            </Menus.Box>

            <Modal.Window name="edit-form">
              <CabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="confirm-box">
              <ConfirmDelete
                recourseName="cabin"
                onConfirm={() => {
                  deleteCabinMutate(cabin.id);
                }}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </Menus.Menu>
        {/* {showForm && (
            <Popup onShow={() => setShowForm((show) => !show)}>
            <CabinForm setShowForm={setShowForm} cabinToEdit={cabin} />
            </Popup>
          )} */}
      </Table.Row>
      {/* {showForm && (
        <Popup onShow={() => setShowForm((show) => !show)}>
          <CabinForm setShowForm={setShowForm} cabinToEdit={cabin} />
        </Popup>
      )} */}
    </>
  );
}

export default CabinItem;
