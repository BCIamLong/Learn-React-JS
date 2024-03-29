// * Before use custom hook for creating and updating
import styled from "styled-components";
import toast from "react-hot-toast";
import { SubmitHandler, useForm, FieldErrors, FieldValues } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "~/components/Button";
import { FileInput, Form, FormRow, Input } from "~/components/form";
import { patchCabin, postCabin } from "~/services/apiCabins";
import Cabin from "~/types/cabin.type";
// import Cabin from "../../types/cabin.type";

const Buttons = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-left: auto;
  margin-right: 0;
  padding-top: 2rem;
`;

const Textarea = styled.textarea`
  padding: 1.6rem 1.2rem;
  border-radius: var(--border-radius-sm);
  /* border-color: inherit; */
  border: 1.5px solid var(--color-grey-200);
  width: 30%;
  resize: none;

  &:focus {
    /* border: none; */
  }
`;

interface Inputs extends FieldValues {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

interface CabinFormProps {
  setShowForm: (show: boolean) => void;
  cabinToEdit?: Cabin;
}

function CabinForm({ setShowForm, cabinToEdit }: CabinFormProps) {
  const { id: editId, ...editData } = cabinToEdit!;
  const { register, handleSubmit, formState, getValues } = useForm<Inputs>({
    defaultValues: editId ? (editData as FieldValues) : {},
  });

  const { errors } = formState;

  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (newCabin: Inputs) => postCabin(newCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Create new cabin successful");

      setTimeout(() => {
        setShowForm(false);
      }, 1000);
    },
    onError: (err) => toast.error(err.message),
  });

  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ id, newCabinData }: { id: number; newCabinData: Inputs }) => patchCabin(id, newCabinData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Edit cabin successful");

      setTimeout(() => {
        setShowForm(false);
      }, 1000);
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  const onSubmit: SubmitHandler<Inputs> = function (data) {
    // console.log(data);
    // mutate({ ...data, image: data.image[0] });
    // if (editId) return console.log(data);
    if (editId) return editCabin({ id: editId, newCabinData: data });

    createCabin(data);
  };

  const onError = function (errors: FieldErrors) {
    console.log(errors);
  };

  /*
      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", { required: "This field is required" })} />
        {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow> 
      * we can refactor this code here to the the FormRow component because in there we have things repeat many times right like Label and Error
  */

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="name" errorMsg={errors.name?.message || ""}>
        {/* <Input type="text" id="name" {...register("name", { required: true })} /> 
        instead use it with required true we can custom it with the message text to show the message on UI for users right*/}
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="maxCapacity" errorMsg={errors.maxCapacity?.message || ""}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="regularPrice" errorMsg={errors.regularPrice?.message || ""}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="discount" errorMsg={errors.discount?.message || ""}>
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            required: "This field is required",
            validate: (val: number) => val <= +getValues().regularPrice || "Discount must less than price",
          })}
          disabled={isWorking}
          defaultValue={0}
        />
      </FormRow>

      <FormRow label="description" errorMsg={errors.description?.message || ""}>
        <Textarea
          id="description"
          {...register("description", {
            required: "This field is required",
            validate: (text: string) => {
              return text.split(" ").length > 2 || "This string must be more 3 words";
            },
          })}
          disabled={isWorking}
        ></Textarea>
      </FormRow>

      <FormRow label="image" errorMsg={errors.image?.message || ""}>
        {/* <Input
          type="text"
          id="image"
          {...register("image", { required: "This field is required" })}
          disabled={isCreating}
        /> */}
        <FileInput
          id="image"
          {...register("image", { required: editId ? false : "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <Buttons>
        <Button $size="medium" $variation="secondary" type="reset" onClick={() => setShowForm(false)}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isWorking ? "Processing" : editId ? "Edit cabin" : "Create new cabin"}</Button>
      </Buttons>
    </Form>
  );
}

export default CabinForm;
