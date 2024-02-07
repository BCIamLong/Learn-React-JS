import styled from "styled-components";

const Input = styled.input`
  padding: 0.6rem 1.2rem;
  border-radius: var(--border-radius-sm);
  /* border-color: inherit; */
  border: 1.5px solid var(--color-grey-200);
  width: 30%;

  &:focus {
    /* border: none; */
  }
`;

export default Input;
