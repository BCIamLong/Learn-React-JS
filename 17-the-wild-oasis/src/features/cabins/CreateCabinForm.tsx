import styled from "styled-components";
import Button from "../../components/Button";
import { Form, FormRow, Label, Input } from "../../components/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCabin } from "../../services/apiCabins";
// import Cabin from "../../types/cabin.type";
import toast from "react-hot-toast";

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
  image: string;
}

interface CreateCabinFormProps {
  setShowForm: (show: boolean) => void;
}

function CreateCabinForm({ setShowForm }: CreateCabinFormProps) {
  const { register, handleSubmit } = useForm<Inputs>();

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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>
      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>
      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice")} />
      </FormRow>
      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          {...register("discount")}
          defaultValue={0}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea id="description" {...register("description")}></Textarea>
      </FormRow>
      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <Input type="text" id="image" {...register("image")} />
      </FormRow>
      <Buttons>
        <Button $size="medium" $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isCreating ? "Processing" : "Create new cabin"}
        </Button>
      </Buttons>
    </Form>
  );
}

export default CreateCabinForm;
