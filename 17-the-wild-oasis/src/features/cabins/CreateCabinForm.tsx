import styled from "styled-components";
import Button from "../../components/Button";
import { Form, FormRow, Label, Input } from "../../components/form";
import { SubmitHandler, useForm } from "react-hook-form";

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
  maxCapacity: string;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

function CreateCabinForm() {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = function (data) {
    console.log(data);
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
        <Button>Create new cabin</Button>
      </Buttons>
    </Form>
  );
}

export default CreateCabinForm;
