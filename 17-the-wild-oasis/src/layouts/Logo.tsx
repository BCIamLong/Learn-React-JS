import styled from "styled-components";

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 60%;
`;

function Logo() {
  return (
    <StyledLogo>
      <Image src="/logo-light.png" alt="The Wild Oasis" />
    </StyledLogo>
  );
}

export default Logo;
