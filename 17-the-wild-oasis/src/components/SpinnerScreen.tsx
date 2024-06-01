import styled from "styled-components";
import Spinner from "./Spinner";

const StyledSpinnerScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default function SpinnerScreen() {
  return (
    <StyledSpinnerScreen>
      <Spinner />
    </StyledSpinnerScreen>
  );
}
