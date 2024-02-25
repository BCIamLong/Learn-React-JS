import styled from "styled-components";

const Textarea = styled.textarea`
  padding: 1.6rem 1.2rem;
  border-radius: var(--border-radius-sm);
  /* border-color: inherit; */
  border: 1.5px solid var(--color-grey-200);
  width: 55%;
  resize: none;
  background-color: var(--color-grey-0);

  &:focus {
    /* border: none; */
  }
`;

export default Textarea;
