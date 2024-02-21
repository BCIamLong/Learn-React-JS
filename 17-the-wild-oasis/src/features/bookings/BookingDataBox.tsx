import { HiOutlineCheckCircle, HiOutlineCurrencyDollar, HiOutlineHomeModern } from "react-icons/hi2";
import styled from "styled-components";
import { Booking } from "~/types/booking.type";
import { formatDate, formatTime, getDistanceDates } from "~/utils/dateUtils";
import formatCurrency from "~/utils/formatCurrency";

const StyledBookingDataBox = styled.div`
  width: 100%;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.8rem;
  font-weight: 600;
  padding: 2rem 3.2rem;
  color: var(--color-brand-50);
  background-color: var(--color-brand-500);
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 3.2rem 3.2rem 2.4rem 3.2rem;
  background-color: var(--color-grey-0);
  margin-bottom: 2rem;
`;

const Hot = styled.p`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  & svg {
    font-size: 3.2rem;
  }
`;
const Email = styled.span`
  color: var(--color-grey-500);
`;

const NationalId = styled.span`
  color: var(--color-grey-500);
`;

const HasBreakfast = styled.p`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  line-height: 1.8;

  span:nth-child(2) {
    font-weight: 500;
  }

  & svg {
    font-size: 2rem;
    color: var(--color-brand-600);
  }
`;

interface TotalPrice {
  $color: string;
}

const TotalPrice = styled.div<TotalPrice>`
  display: flex;
  border-radius: var(--border-radius-sm);
  justify-content: space-between;
  align-items: center;
  padding: 2.4rem 3rem;
  background-color: var(--color-${(props) => props.$color}-100);
  color: var(--color-${(props) => props.$color}-700);

  p:nth-child(2) {
    font-weight: 600;
    font-size: 1.4rem;
    text-transform: uppercase;
  }

  p:first-child {
    display: flex;
    gap: 1rem;
    align-items: center;
    svg {
      font-size: 2.4rem;
    }

    span:nth-child(2) {
      font-weight: 500;
      margin-right: 0.6rem;
    }
  }
`;

const BookedDate = styled.p`
  display: flex;
  justify-content: end;
  align-items: end;
  font-size: 1.2rem;
  color: var(--color-grey-500);
`;

const UserInfos = styled.p`
  font-weight: 500;
`;

export default function BookingDataBox({
  booking: {
    id,
    cabins: { name },
    guests: { fullName, email },
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    status,
    isPaid,
    observation,
    createdAt,
  },
}: {
  booking: Booking;
}) {
  // const navigate = useNavigate();
  // console.log(nationalId);
  return (
    <StyledBookingDataBox>
      <Heading>
        <Hot>
          <HiOutlineHomeModern />
          <span>
            {numNights} nights in Cabin {name}
          </span>
        </Hot>
        <p>
          {formatDate(startDate)} ({getDistanceDates(startDate, endDate)} days ago) — {formatDate(endDate)}
        </p>
      </Heading>
      <Detail>
        <UserInfos>
          {/* {fullName} K + {numGuests - 1} guests • <Email>{email}</Email> • <NationalId>{nationalId}</NationalId> */}
          {fullName} K {numGuests - 1 > 0 && `+ ${numGuests - 1} guests `}• <Email>{email}</Email> •{" "}
          <NationalId>National ID</NationalId>
        </UserInfos>
        <HasBreakfast>
          <HiOutlineCheckCircle />
          <span>Breakfast included?</span>
          <span>{hasBreakfast ? "Yes" : "No"}</span>
        </HasBreakfast>
        <TotalPrice $color={status === "checked-in" ? "green" : "yellow"}>
          <p>
            <HiOutlineCurrencyDollar />
            <span>Total price</span>
            <span>{formatCurrency(totalPrice)}</span>
            {isPaid && hasBreakfast && (
              <span>
                ({formatCurrency(cabinPrice)} cabin + {formatCurrency(extrasPrice)} breakfast)
              </span>
            )}
          </p>
          <p>{status === "checked-in" ? "Paid" : "WILL PAY AT PROPERTY"}</p>
        </TotalPrice>
        <BookedDate>Booked {formatTime(createdAt)}</BookedDate>
      </Detail>
    </StyledBookingDataBox>
  );
}
