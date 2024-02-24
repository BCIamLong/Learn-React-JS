import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProfile as updateProfileService } from "~/services/apiAuth";

export const useUpdateProfile = function () {
  const queryClient = useQueryClient();
  const {
    mutate: updateProfile,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateProfileService,
    onSuccess: () => {
      toast.success("Your profile is updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateProfile, isUpdating, error };
};
