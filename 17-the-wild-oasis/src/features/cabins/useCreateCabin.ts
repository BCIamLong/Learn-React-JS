import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { postCabin } from "~/services/apiCabins";

interface Inputs extends FieldValues {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createCabinMutate } = useMutation({
    mutationFn: (newCabin: Inputs) => postCabin(newCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // toast.success("Create new cabin successful");

      //   setTimeout(() => {
      //     setShowForm(false);
      //   }, 1000);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabinMutate };
}
