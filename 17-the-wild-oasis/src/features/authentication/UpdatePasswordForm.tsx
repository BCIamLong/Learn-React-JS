import { useForm } from "react-hook-form";
import Button from "~/components/Button";
import { Buttons, Form, FormRow, Input } from "~/components/form";
import { useUpdateProfile } from "./useUpdateProfile";

interface Inputs {
  password: string;
  passwordConfirm: string;
}

export default function UpdatePasswordForm() {
  const { register, reset, formState, getValues, handleSubmit } = useForm<Inputs>();
  const { errors } = formState;
  const { updateProfile, isUpdating } = useUpdateProfile();

  function onSubmit({ password }: Omit<Inputs, "passwordConfirm">) {
    updateProfile({ password });
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="New password" errorMsg={errors.password?.message || ""}>
        <Input
          id="password"
          type="password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow label="Confirm password" errorMsg={errors.passwordConfirm?.message || ""}>
        <Input
          id="passwordConfirm"
          type="password"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (val) => val === getValues().password || "Please provide the correct confirm password",
          })}
        />
      </FormRow>
      <Buttons>
        <Button $variation="secondary" type="reset" onClick={() => reset} disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>{isUpdating ? "Updating" : "Update password"}</Button>
      </Buttons>
    </Form>
  );
}
