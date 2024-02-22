import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledLoginLayout = styled.div``;

export default function LoginLayout() {
  return (
    <StyledLoginLayout>
      <Outlet />
    </StyledLoginLayout>
  );
}
