import styled from "styled-components";
import Row from "./Row";
import GlobalStyles from "~/styles/GlobalStyles";
import Button from "./Button";
import { FallbackProps } from "react-error-boundary";

const StyledErrorFallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-0);
  padding: 3rem;
  gap: 1.6rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-100);
`;

const StyledBackground = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  padding: 6rem;
`;

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <>
      <GlobalStyles />
      <StyledBackground>
        <StyledErrorFallback>
          <Row>
            <h1>Something went wrong 🧐</h1>
          </Row>
          <Row>{error.message}</Row>
          <Row>
            <Button $size="large" onClick={resetErrorBoundary}>
              Try it again
            </Button>
          </Row>
        </StyledErrorFallback>
      </StyledBackground>
    </>
  );
}
