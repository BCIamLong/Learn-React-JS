import styled from "styled-components";
import toast from "react-hot-toast";
import { SubmitHandler, useForm, FieldErrors } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "~/components/Button";
import { Form, FormRow, Label, Input } from "~/components/form";
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

const Error = styled.p`
  color: var(--color-red-700);
`;

interface Inputs {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
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
    mutate(data);
  };

  const onError = function (errors: FieldErrors) {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        {/* <Input type="text" id="name" {...register("name", { required: true })} /> 
        instead use it with required true we can custom it with the message text to show the message on UI for users right*/}
        <Input type="text" id="name" {...register("name", { required: "This field is required" })} />
        {errors.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", { required: "This field is required" })} />
        {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice", { required: "This field is required" })} />
        {errors.regularPrice && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            required: "This field is required",
            validate: (val: number) => val <= +getValues().regularPrice || "Discount must less than price",
          })}
          defaultValue={0}
        />
        {errors.discount && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          id="description"
          {...register("description", {
            required: "This field is required",
            validate: (text: string) => {
              return text.split(" ").length > 2 || "This string must be more 3 words";
            },
          })}
        ></Textarea>
        {errors.description && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <Input type="text" id="image" {...register("image", { required: "This field is required" })} />
        {errors.image && <Error>{errors.image.message}</Error>}
      </FormRow>

      <Buttons>
        <Button $size="medium" $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>{isCreating ? "Processing" : "Create new cabin"}</Button>
      </Buttons>
    </Form>
  );
}

export default CreateCabinForm;
