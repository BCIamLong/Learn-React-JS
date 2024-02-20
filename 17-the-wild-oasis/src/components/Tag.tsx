import styled from "styled-components";

interface Tag {
  $color: string;
}

const Tag = styled.p<Tag>`
  display: inline-block;
  padding: 0.6rem 1rem;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-${(props) => props.$color}-100);
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-${(props) => props.$color}-700);
  line-height: 1;
`;

export default Tag;
