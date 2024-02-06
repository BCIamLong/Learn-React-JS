// import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";
import Cabin from "../../types/cabin.type";
import formatCurrency from "../../utils/formatCurrency";
import Button from "../../components/Button";

const TableItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 2fr 1fr 1fr 1fr;
  padding: 0.6rem 1.2rem 0.3rem 0;

  border-bottom: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  align-items: center;
  background-color: var(--color-grey-0);

  & div:last-child {
    justify-self: end;
  }

  &:last-child {
    border-bottom: none;
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
`;

// const Options = styled.button``;

interface CabinItemProps {
  cabin: Cabin;
}

function CabinItem({ cabin }: CabinItemProps) {
  return (
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
        <Button $size="tiny" $variation="option">
          <StyledHiEllipsisVertical />
        </Button>
      </div>
    </TableItem>
  );
}

export default CabinItem;
