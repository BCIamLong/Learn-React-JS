import styled from "styled-components";
import UserBox from "~/features/authentication/UserBox";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  display: flex;
  justify-content: end;
  background-color: var(--color-grey-0);
  padding: 2rem 1.2rem;
  border-bottom: 1px solid var(--color-grey-50);
  gap: 2rem;
  padding-right: 4.8rem;
`;

function Header() {
  return (
    <StyledHeader>
      <UserBox />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
