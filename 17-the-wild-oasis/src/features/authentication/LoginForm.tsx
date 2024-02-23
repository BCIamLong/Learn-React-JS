import { FormEvent, useState } from "react";

import { useLogin } from "./useLogin";
import Button from "~/components/Button";
import { Form, FormRow, Input } from "~/components/form";
import SpinnerMini from "~/components/SpinnerMini";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLogging } = useLogin();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email Address" errorMsg="" direction="column">
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLogging} />
      </FormRow>
      <FormRow label="Password" errorMsg="" direction="column">
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogging}
        />
      </FormRow>
      <Button $variation="login" disabled={isLogging}>
        {isLogging ? <SpinnerMini /> : "Login"}
      </Button>
    </Form>
  );
}
