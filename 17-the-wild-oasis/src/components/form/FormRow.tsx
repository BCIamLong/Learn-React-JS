import styled from "styled-components";
import { Label, FormRowStyle } from ".";
import { ReactElement } from "react";

const Error = styled.p`
  color: var(--color-red-700);
  width: 21rem;
`;

const FormItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
  width: 42rem !important;
  label {
    text-transform: capitalize;
  }

  input {
  }
`;

interface FormRowProps {
  label: string;
  errorMsg: string;
  children: ReactElement<HTMLInputElement>;
  direction?: string;
}

export default function FormRow({ direction, label, errorMsg, children }: FormRowProps) {
  // * so basically we refactor the FormRow component with Label and Error because two these will not change right
  // * and the Input can be input element or textarea or select and also something different and therefore we should pass it as children prop
  return (
    <FormRowStyle $direction={direction}>
      {/* * so because we always pass in only the input element so therefore we can use this nice trick to access to the id prop of that input element and assign in to the htmlFor prop of label */}
      <FormItem>
        <Label htmlFor={children?.props.id}>{label}</Label>
        {children}
      </FormItem>
      {errorMsg && <Error>{errorMsg}</Error>}
    </FormRowStyle>
  );
}
