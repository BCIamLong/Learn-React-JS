import { FieldValues, useForm } from "react-hook-form";
import Button from "~/components/Button";
import { Form, FormRow, Input, Buttons } from "~/components/form";
import { useSignUp } from "./useSignUp";
// import SpinnerMini from "~/components/SpinnerMini";

interface Inputs extends FieldValues {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUpForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm<Inputs>();
  const { errors } = formState;
  // console.log(errors);
  const { signup, isSigningUp } = useSignUp();

  function onSubmit({ fullName, email, password }: Inputs) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" errorMsg={errors?.fullName?.message || ""}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Email" errorMsg={errors?.email?.message || ""}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i,
              message: "Please provide the valid email",
            },
          })}
        />
      </FormRow>
      <FormRow label="Password" errorMsg={errors?.password?.message || ""}>
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow label="Password confirm" errorMsg={errors?.passwordConfirm?.message || ""}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (val) => val === getValues().password || "Please write the correct password confirm",
          })}
        />
      </FormRow>

      <Buttons>
        <Button $size="medium" $variation="secondary" type="reset" disabled={isSigningUp}>
          Cancel
        </Button>
        <Button disabled={isSigningUp}>{isSigningUp ? "Processing" : "Create new user"}</Button>
      </Buttons>
    </Form>
  );
}
