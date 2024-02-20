import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "~/services/apiBookings";

export const useBooking = function () {
  const { bookingId } = useParams() || {};

  const {
    data: booking,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(+bookingId || 1),
  });

  return { booking, error, isLoading };
};
