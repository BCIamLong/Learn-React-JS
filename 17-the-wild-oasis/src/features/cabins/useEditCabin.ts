import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { patchCabin } from "~/services/apiCabins";

interface Inputs extends FieldValues {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: editCabinMutate } = useMutation({
    mutationFn: ({ id, newCabinData }: { id: number; newCabinData: Inputs }) => patchCabin(id, newCabinData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Edit cabin successful");

      //   setTimeout(() => {
      //     setShowForm(false);
      //   }, 1000);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabinMutate };
}
