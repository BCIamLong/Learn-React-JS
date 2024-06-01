import { useQuery } from "@tanstack/react-query";
import { getSearchBookings } from "~/services/apiBookings";

export const useSearchBookings = function (query: string) {
  const {
    data: bookings,
    error,
    isLoading: isSearching,
  } = useQuery({
    queryKey: ["search-bookings", query],
    queryFn: () => getSearchBookings(query),
  });
  return { bookings, error, isSearching };
};
