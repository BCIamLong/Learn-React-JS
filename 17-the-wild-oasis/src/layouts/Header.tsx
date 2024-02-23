import styled from "styled-components";
import Logout from "~/features/authentication/Logout";

const StyledHeader = styled.header`
  display: flex;
  justify-content: end;
  background-color: var(--color-grey-0);
  padding: 2rem 1.2rem;
  border-bottom: 1px solid var(--color-grey-50);
`;

function Header() {
  return (
    <StyledHeader>
      <Logout />
    </StyledHeader>
  );
}

export default Header;
