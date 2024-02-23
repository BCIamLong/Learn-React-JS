import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupService } from "~/services/apiAuth";

export const useSignUp = function () {
  const {
    mutate: signup,
    isPending: isSigningUp,
    error,
  } = useMutation({
    mutationFn: signupService,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Sign up user successfully, please verify email to get access to our application");
    },
    onError: (err) => toast.error(err.message),
  });

  return { signup, isSigningUp, error };
};
