import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "~/services/apiBookings";

export const useCheckIn = function () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: checkIn,
    isPending: isCheckingIn,
    error,
  } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        isPaid: true,
        status: "checked-in",
      }),
    //* in the onSuccess we can access to the data return from the mutation function to do something like in this case we can use it to display the specify message....
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success(`Booking #${data.id} is checked in successful`);
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Check in not successful please check again");
    },
  });

  return { checkIn, isCheckingIn, error };
};
