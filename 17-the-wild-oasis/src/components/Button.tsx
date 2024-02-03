import styled from "styled-components";

const Button = styled.button`
  padding: 1.2rem 1.6rem;
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-brand-600);
  color: var(--color-brand-50);
  &:hover {
    background-color: var(--color-brand-700);
  }
`;

export default Button;
