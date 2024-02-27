import { HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineBanknotes, HiOutlineChartBar } from "react-icons/hi2";
import Stat from "./Stat";
import { Booking } from "~/types/booking.type";
import formatCurrency from "~/utils/formatCurrency";

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  numCabins,
}: {
  bookings: Partial<Booking>[];
  confirmedStays: Partial<Booking>[];
  numDays: number;
  numCabins: number;
}) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((sum, booking) => (booking.totalPrice ? sum + booking.totalPrice : sum), 0);
  const checkedIns = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((sum, stay) => (stay.numNights ? sum + stay.numNights : sum), 0) / (numDays * numCabins);

  return (
    <>
      <Stat color="blue" title="Bookings" value={String(numBookings)} icon={<HiOutlineBriefcase />} />
      <Stat color="green" title="SALES" value={formatCurrency(sales)} icon={<HiOutlineBanknotes />} />
      <Stat color="indigo" title="CHECK INS" value={String(checkedIns)} icon={<HiOutlineCalendarDays />} />
      <Stat
        color="yellow"
        title="OCCUPANCY RATE"
        value={(occupation * 100).toFixed(2) + "%"}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}
