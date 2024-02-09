import styled from "styled-components";
import toast from "react-hot-toast";
import { SubmitHandler, useForm, FieldErrors } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "~/components/Button";
import { FileInput, Form, FormRow, Input } from "~/components/form";
import { postCabin } from "~/services/apiCabins";
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

interface Inputs {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

interface CreateCabinFormProps {
  setShowForm: (show: boolean) => void;
}

function CreateCabinForm({ setShowForm }: CreateCabinFormProps) {
  const { register, handleSubmit, formState, getValues } = useForm<Inputs>();

  const { errors } = formState;

  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate } = useMutation({
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

  const onSubmit: SubmitHandler<Inputs> = function (data) {
    // console.log(data);
    mutate({ ...data, image: data.image[0] });
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
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="maxCapacity" errorMsg={errors.maxCapacity?.message || ""}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", { required: "This field is required" })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="regularPrice" errorMsg={errors.regularPrice?.message || ""}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required" })}
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
        ></Textarea>
      </FormRow>

      <FormRow label="image" errorMsg={errors.image?.message || ""}>
        {/* <Input
          type="text"
          id="image"
          {...register("image", { required: "This field is required" })}
          disabled={isCreating}
        /> */}
        <FileInput id="image" {...register("image", { required: "This field is required" })} disabled={isCreating} />
      </FormRow>

      <Buttons>
        <Button $size="medium" $variation="secondary" type="reset" onClick={() => setShowForm(false)}>
          Cancel
        </Button>
        <Button disabled={isCreating}>{isCreating ? "Processing" : "Create new cabin"}</Button>
      </Buttons>
    </Form>
  );
}

export default CreateCabinForm;
