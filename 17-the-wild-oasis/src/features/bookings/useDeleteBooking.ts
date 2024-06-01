import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteBooking as deleteBookingService } from "~/services/apiBookings";

export const useDeleteBooking = function () {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingService,
    onSuccess: () => {
      toast.success("Delete booking successful");
      // queryClient.invalidateQueries({ active: true });
      // * active true is not necessary now, so it by default applies when we use { queryKey: ["bookings"] } and everything work as well like before, if we have sub key
      // *["bookings",{"filter":{"field":"status","method":"eq","value":""},"page":1,"sort":{"direction":"dsc","field":"totalPrice"}}] like this it will work just file like when we use active so now it integrated to the default behavior
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/bookings");
    },
    onError: (error) => toast.error(error.message),
  });
  return { isDeleting, deleteBooking };
};
