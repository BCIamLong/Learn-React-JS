import { Buttons, FileInput, Form, FormRow, Input } from "~/components/form";
import { useUser } from "./useUser";
import Button from "~/components/Button";
import { FormEvent, useState } from "react";
import { useUpdateProfile } from "./useUpdateProfile";

export default function UpdateProfileForm() {
  const { user } = useUser();
  const { email, user_metadata } = user || {};
  const { fullName: currentFullName } = user_metadata || {};

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File>();

  const { updateProfile, isUpdating } = useUpdateProfile();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    updateProfile({ avatar, fullName });

    // setAvatar();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email" errorMsg="">
        <Input type="email" id="email" value={email} disabled />
      </FormRow>
      <FormRow label="Full Name" errorMsg="">
        <Input
          type="text"
          id="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar" errorMsg="">
        <FileInput type="file" id="avatar" onChange={(e) => setAvatar(e.target?.files?.[0])} disabled={isUpdating} />
      </FormRow>

      <Buttons>
        <Button $variation="secondary" type="reset" onClick={() => setFullName(currentFullName)} disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>{isUpdating ? "Updating" : "Update profile"}</Button>
      </Buttons>
    </Form>
  );
}
