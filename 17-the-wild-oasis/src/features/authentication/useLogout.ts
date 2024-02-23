import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout as logoutService } from "~/services/apiAuth";

export const useLogout = function () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: logout,
    isPending: isLoggingOut,
    error,
  } = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      toast.success("Logout successfully");
      // ? so why we need replace true?
      // * https://reactrouter.com/en/main/hooks/use-navigate#optionsreplace
      // * so with replace true we will not create request if before we visited this page so basically we don't add new quest so don't add new page in our history stack
      // * instead what want is go to the page before if it's really existed in our history stack
      // * with this we don't waste more request and also don't load request when we redirect to this page
      // * in our case we go to login page then we login to the homepage right so history stack now includes login page, home page and now we logout instead we create new request to make the history stack to login page, home page, login page
      // * we just go back to the login page before in our history stack right, and that's what the replace option mean so it's useful in this case right
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });

  return { logout, isLoggingOut, error };
};
