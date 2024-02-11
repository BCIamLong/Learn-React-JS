import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { patchSetting } from "~/services/apiSettings";
// import Setting from "~/types/setting.type";

// interface Inputs extends FieldValues {
//   name: string;
//   maxCapacity: number;
//   regularPrice: number;
//   discount: number;
//   description: string;
//   image: FileList;
// }

export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateSettingMutate } = useMutation({
    // mutationFn: (newSetting: Setting) => patchSetting(newSetting),
    mutationFn: patchSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("The setting is updated successfully");

      //   setTimeout(() => {
      //     setShowForm(false);
      //   }, 1000);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSettingMutate };
}
