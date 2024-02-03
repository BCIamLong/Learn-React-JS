import styled from 'styled-components';

const Input = styled.input`
  padding: 0.6rem 1.2rem;
  border-radius: var(--border-radius-sm);
  /* border-color: inherit; */
  border: none;

  &:focus {
    border: none;
  }
`;

export default Input;
