import styled from "styled-components";
import Button from "./Button";

const StyledConfirmDelete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  z-index: 100;
  background-color: var(--color-grey-0);
  padding: 3rem;
  max-width: 60rem;

  & h3 {
    font-size: 2.4rem;
    font-weight: 600;
  }

  & p {
    color: var(--color-grey-500);
  }

  & div {
    display: flex;
    justify-content: end;
    gap: 0.6rem;
  }
`;

export function ConfirmDelete({
  onConfirm,
  onCloseModal,
  disabled,
}: {
  onConfirm: () => void;
  onCloseModal?: (name: string) => void;
  disabled: boolean;
}) {
  return (
    <StyledConfirmDelete>
      <h3>Delete cabins</h3>
      <p>Are you sure you want to delete this cabins permanently? This action cannot be undone.</p>
      <div>
        <Button $variation="option" onClick={() => onCloseModal?.("false")} disabled={disabled}>
          Cancel
        </Button>
        <Button $variation="danger" onClick={onConfirm} disabled={disabled}>
          {disabled ? "Deleting" : "Delete"}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}
