import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginService } from "~services/apiAuth";

interface credentials {
  email: string;
  password: string;
}

export const useLogin = function () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: ({ email, password }: credentials) => loginService({ email, password }),
    onSuccess: (data) => {
      toast.success("Login successfully");
      queryClient.setQueryData(["user"], data.user);
      // queryClient.setQueriesData(["user"], user);
      navigate("/dashboard", { replace: true });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLogging };
};
