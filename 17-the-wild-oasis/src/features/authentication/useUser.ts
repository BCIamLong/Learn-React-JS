import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "~/services/apiAuth";

export const useUser = function () {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated", error };
};
