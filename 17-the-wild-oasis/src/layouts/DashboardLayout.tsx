import { ReactNode } from "react";
import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr 1fr 1fr; */
`;

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <StyledDashboardLayout>{children}</StyledDashboardLayout>;
}
