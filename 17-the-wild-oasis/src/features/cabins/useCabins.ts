import { useQuery } from "@tanstack/react-query";
import { getCabins } from "~/services/apiCabins";

export default function useCabins() {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
    staleTime: 0,
  });
  return { cabins, error, isLoading };
}
