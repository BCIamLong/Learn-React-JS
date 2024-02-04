import styled from "styled-components";
import Footer from "./Footer";

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-0);
  padding: 2.4rem 1.2rem;
  grid-row: 1/-1;
  border-right: 1px solid var(--color-grey-50);
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <h1>Sidebar</h1>
      <Footer />
    </StyledSidebar>
  );
}

export default Sidebar;
