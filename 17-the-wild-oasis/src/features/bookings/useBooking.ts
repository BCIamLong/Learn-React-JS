import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "~/services/apiBookings";

export const useBooking = function () {
  const params = useParams();
  const bookingId = params?.bookingId ? params.bookingId : "";

  const {
    data: booking,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["booking"],
    // queryKey: ["booking", bookingId],
    queryFn: () => getBooking(+bookingId || 1),
  });

  return { booking, error, isLoading };
};
