import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: inherit;
  padding: 1.2rem 0;
  margin-top: auto;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  /* margin-bottom: 0rem; */
`;

function Footer() {
  return (
    <StyledFooter>
      <p>Copyright &copy; {new Date().getFullYear()} by Long Hoang</p>
    </StyledFooter>
  );
}

export default Footer;
