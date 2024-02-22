import styled from "styled-components";

interface FormRow {
  $direction?: string;
}

const FormRow = styled.div<FormRow>`
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  align-items: center;
  gap: 2rem;
  width: 100%;
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1.2rem 0;
`;

export default FormRow;
