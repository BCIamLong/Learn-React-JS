import styled from "styled-components";
import Footer from "./Footer";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { Uploader } from "~/data/Uploader";

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  background-color: var(--color-grey-0);
  padding: 2.4rem 1.2rem;
  grid-row: 1/-1;
  border-right: 1px solid var(--color-grey-50);
  box-shadow: var(--shadow-md);
  overflow-y: scroll;
  /* scrollbar-width: thin;
  scrollbar-color: var(--color-brand-500) var(--color-grey-100); */

  &::-webkit-scrollbar {
    display: none;
  }
`;

// const SidebarBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 2.4rem;
//   overflow-y: scroll;
//   /* scrollbar-width: thin;
//   scrollbar-color: var(--color-brand-500) var(--color-grey-100); */

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

function Sidebar() {
  return (
    // <h1>Sidebar</h1>
    <StyledSidebar>
      {/* <SidebarBox> */}
      <Logo />
      <MainNav />
      <Uploader />
      <Footer />
      {/* </SidebarBox> */}
    </StyledSidebar>
  );
}

export default Sidebar;
