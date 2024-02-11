import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "~/services/apiCabins";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCabinMutate } = useMutation({
    mutationFn: (id: number) => deleteCabin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // setIsSelected(false);
      toast.success("Delete cabin successfully");
    },
    onError: (err) => toast.error(err.message),
    // onError: (err) =>
    //   toast.custom(
    //     <div>
    //       {err.message} <button onClick={endPause}>Close</button>
    //     </div>
    //   ),
  });

  return { isDeleting, deleteCabinMutate };
}
