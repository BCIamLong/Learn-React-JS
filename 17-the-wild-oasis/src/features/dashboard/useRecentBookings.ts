import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "~/services/apiBookings";

export const useRecentBookings = function () {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last") ? Number(searchParams.get("last")?.split("-")[0]) : 7;

  const queryDate = subDays(new Date(), numDays);

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${queryDate}`],
  });

  return { isLoading, bookings, error };
};
