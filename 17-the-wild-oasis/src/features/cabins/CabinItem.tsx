// import { ReactNode } from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import { HiEllipsisVertical, HiPencil, HiMiniTrash, HiMiniSquare2Stack } from "react-icons/hi2";

import useDeleteCabin from "./useDeleteCabin";
import Cabin from "~/types/cabin.type";
import formatCurrency from "~/utils/formatCurrency";
import Button from "~/components/Button";
import Popup from "~/components/Popup";
import CabinForm from "./CabinForm";
import useCreateCabin from "./useCreateCabin";
import toast from "react-hot-toast";

const TableItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 2fr 1fr 1fr 1fr;
  padding: 0.6rem 1.2rem 0.3rem 0;

  border-bottom: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  align-items: center;
  background-color: var(--color-grey-0);
  position: relative;

  & div:last-child {
    justify-self: end;
  }

  &:last-child {
    border-bottom: none;
    border-bottom-left-radius: var(--border-radius-md);
    border-bottom-right-radius: var(--border-radius-md);
  }
`;

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

const OptionsBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 90%;
  right: 1.5%;
  z-index: 100;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);

  & button:first-child {
    border-top-right-radius: var(--border-radius-md);
    border-top-left-radius: var(--border-radius-md);
  }
  & button:last-child {
    border-bottom-right-radius: var(--border-radius-md);
    border-bottom-left-radius: var(--border-radius-md);
  }

  & button {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 1.6rem 2rem;
    background-color: var(--color-grey-0);
    border: none;
  }

  & button:hover {
    background-color: var(--color-grey-100);
  }

  & button:focus {
    border: none;
    /* outline: none; */
    outline: 1px solid var(--color-brand-900);
    background-color: var(--color-grey-100);
    /* border-collapse: collapse; */
  }
`;

// const Options = styled.button``;

interface CabinItemProps {
  cabin: Cabin;
}

function CabinItem({ cabin }: CabinItemProps) {
  // const { handlers } = useToaster();
  // const { startPause, endPause } = handlers;

  const [isSelected, setIsSelected] = useState(false);
  const [showForm, setShowForm] = useState(false);
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
        setIsSelected(false);
        toast.success("Duplicate cabin successful");
      },
    });
  }
  return (
    <>
      <TableItem role="row">
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
        <div>
          <Button $size="tiny" $variation="option" onClick={() => setIsSelected((isSelected: boolean) => !isSelected)}>
            <StyledHiEllipsisVertical />
          </Button>
          {isSelected && (
            <OptionsBox>
              <button disabled={isCreating} onClick={handleDuplicateCabin}>
                <HiMiniSquare2Stack />
                <span>{isCreating ? "Duplicating" : "Duplicate"}</span>
              </button>
              <button
                onClick={() => {
                  setShowForm(true);
                  setIsSelected(false);
                }}
              >
                <HiPencil />
                <span>Edit</span>
              </button>
              <button onClick={() => deleteCabinMutate(cabin.id)} disabled={isDeleting}>
                <HiMiniTrash />
                <span>{isDeleting ? "Deleting" : "Delete"}</span>
              </button>
            </OptionsBox>
          )}
          {showForm && (
            <Popup onShow={() => setShowForm((show) => !show)}>
              <CabinForm setShowForm={setShowForm} cabinToEdit={cabin} />
            </Popup>
          )}
        </div>
      </TableItem>
      {/* {showForm && (
        <Popup onShow={() => setShowForm((show) => !show)}>
          <CabinForm setShowForm={setShowForm} cabinToEdit={cabin} />
        </Popup>
      )} */}
    </>
  );
}

export default CabinItem;
