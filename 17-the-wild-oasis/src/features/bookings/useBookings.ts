import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_LIMIT } from "~/configs/constant";
import { getBookings } from "~/services/apiBookings";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("status") || "";
  const sort = searchParams.get("sort") || "createdAt-dsc";
  const [sortField, direction] = sort.split("-");

  const currentPage = +searchParams.get("page")! || 1;

  const options = {
    filter: {
      // field: "totalPrice",
      // value: 5000,
      // method: "gte",
      field: "status",
      value: filter === "all" ? "" : filter,
      method: "eq",
    },
    sort: {
      field: sortField,
      direction,
    },
    page: currentPage,
  };

  const {
    data: { bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", options],
    // * so basically we can consider the array here in our queryKey is the dependency array and we can pass in the value can change and effect to our booking data
    // * like in this case i want it update when the filter change then when we click filter like for status checked in only the booking data with status checked in is display right
    // * and we need to pass in this options contain filter here to this queryKey array because it will update when something change in this array so like the dependency array in useEffect hook right
    // ? and if we don't do this we might have no idea to update the data based on this  filter value change right so it's not mutation like update, insert, delete then we can't use inValidate function from query client right
    // * so notice that if we met this situation so like in this case we can use this way to refetch the data when something change which we pass in the query array right
    queryFn: () => getBookings(options),
    staleTime: 0,
  });

  const pageCount = Math.ceil((count || 0) / PAGE_LIMIT);
  if (currentPage < pageCount) {
    const prefetchOptions = { ...options, page: currentPage + 1 };

    queryClient.prefetchQuery({
      queryKey: ["bookings", prefetchOptions],
      queryFn: () => getBookings(prefetchOptions),
    });
  }

  if (currentPage > 1 && currentPage <= pageCount) {
    const prefetchOptions = { ...options, page: currentPage - 1 };

    queryClient.prefetchQuery({
      queryKey: ["bookings", prefetchOptions],
      queryFn: () => getBookings(prefetchOptions),
    });
  }

  return { bookings, isLoading, error, count };
}
