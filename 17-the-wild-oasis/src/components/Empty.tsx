import styled from "styled-components";

const StyledEmpty = styled.p`
  padding: 1.2rem;
  font-size: 1.6rem;
  color: var(--color-grey-600);
`;

export default function Empty({ resourceName }: { resourceName: string }) {
  return <StyledEmpty>Currently, no {resourceName} data is available. Please check back later.</StyledEmpty>;
}
