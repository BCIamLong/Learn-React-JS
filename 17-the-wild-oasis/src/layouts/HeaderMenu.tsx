import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi2";

import Button from "~/components/Button";
import Logout from "~/features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "~/components/DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <Button $variation="header" onClick={() => navigate("/account")}>
        <HiOutlineUser />
      </Button>
      <DarkModeToggle />
      <Logout />
    </StyledHeaderMenu>
  );
}
