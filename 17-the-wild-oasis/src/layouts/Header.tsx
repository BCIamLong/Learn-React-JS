import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 2rem 1.2rem;
  border-bottom: 1px solid var(--color-grey-50);
`;

function Header() {
  return (
    <StyledHeader>
      <h1>Header</h1>
    </StyledHeader>
  );
}

export default Header;
