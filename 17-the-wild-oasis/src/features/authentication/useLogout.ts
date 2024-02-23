import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { logout as logoutService } from "~/services/apiAuth";

export const useLogout = function () {
  const navigate = useNavigate();
  const {
    mutate: logout,
    isPending: isLoggingOut,
    error,
  } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      toast.success("Logout successfully");
      navigate("/login", { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });

  return { logout, isLoggingOut, error };
};
