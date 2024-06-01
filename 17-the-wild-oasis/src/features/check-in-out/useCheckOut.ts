import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "~/services/apiBookings";

export const useCheckOut = function () {
  const queryClient = useQueryClient();
  const {
    mutate: checkOut,
    isPending: isCheckingOut,
    error,
  } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    //* in the onSuccess we can access to the data return from the mutation function to do something like in this case we can use it to display the specify message....
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is checked out successful`);
      // queryClient.invalidateQueries({ active: true });
      // * if we want invalidate multiple we need to do like this so invalidate queries separate like this
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => {
      toast.error("Check out not successful please check again");
    },
  });

  return { checkOut, isCheckingOut, error };
};
