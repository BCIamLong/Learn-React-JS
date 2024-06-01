import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "~/services/apiBookings";
import { formatTime } from "~/utils/dateUtils";

export const useRecentStays = function () {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last") ? Number(searchParams.get("last")?.split("-")[0]) : 7;

  const queryDate = subDays(new Date(), numDays);

  // * because query date is calculate with millisecond then if we use that it will load data to cache every time so with format time we will load it in 1 minute of course the react query behavior also automatically load data for us after stale time right
  // * but we just put it here and it's also work good but we can put the variable for unique forever
  // * here we can use formatDate to formatDate to format it to 1 days so the different when it convert to day
  // * of course it is just for unique different is enough doesn't need anything like this
  // const queryDateExtraKey = formatDate(queryDate);
  const queryDateExtraKey = formatTime(queryDate);

  const {
    isLoading,
    data: stays,
    error,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${queryDateExtraKey}`],
  });

  const confirmedStays = stays?.filter((stay) => stay.status !== "unconfirmed");
  //   const confirmedStays = stays?.filter((stay) => stay.status === "checked-in" || stay.status === "checked-out");

  return { isLoading, stays, confirmedStays, error, numDays };
};
