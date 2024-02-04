import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  padding: 4.8rem 3rem;
  background-color: var(--color-grey-50);
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      {/* <h1>App Layout</h1> */}
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
