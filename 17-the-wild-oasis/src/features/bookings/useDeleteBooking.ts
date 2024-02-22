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
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings");
    },
    onError: (error) => toast.error(error.message),
  });
  return { isDeleting, deleteBooking };
};
