import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: inherit;
  padding: 1.2rem 0;
  margin-top: auto;
  /* margin-bottom: 0rem; */
`;

function Footer() {
  return (
    <StyledFooter>
      <h4>Footer</h4>
    </StyledFooter>
  );
}

export default Footer;
