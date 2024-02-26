import { useQuery } from "@tanstack/react-query";
import { format, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "~/services/apiBookings";

export const useRecentStays = function () {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last") ? Number(searchParams.get("last")?.split("-")[0]) : 7;

  const queryDate = subDays(new Date(), numDays);
  // const queryDate1 = format(queryDate, "MMM dd");

  const {
    isLoading,
    data: stays,
    error,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${queryDate}`],
  });

  const confirmedStays = stays?.filter((stay) => stay.status !== "unconfirmed");
  //   const confirmedStays = stays?.filter((stay) => stay.status === "checked-in" || stay.status === "checked-out");

  return { isLoading, stays, confirmedStays, error, numDays };
};
