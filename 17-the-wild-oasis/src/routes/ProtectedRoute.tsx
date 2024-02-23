import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "~/components/Spinner";
import { useUser } from "~/features/authentication/useUser";

const StyledProtectedRoute = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(
    function () {
      console.log(isAuthenticated, isLoading);
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading)
    return (
      <StyledProtectedRoute>
        <Spinner />
      </StyledProtectedRoute>
    );

  if (isAuthenticated) return children;
}
