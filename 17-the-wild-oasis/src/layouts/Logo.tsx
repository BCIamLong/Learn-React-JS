import styled from "styled-components";
import { useDarkMode } from "~/context/DarkModeContext";

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 0.6rem; */
`;

const Image = styled.img`
  width: 60%;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo>
      <Image src={src} alt="The Wild Oasis" />
    </StyledLogo>
  );
}

export default Logo;
