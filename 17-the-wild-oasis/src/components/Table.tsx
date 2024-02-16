import { useContext, createContext, ReactNode } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  width: 100%;
  /* overflow: hidden; */
`;

interface CommonRow {
  $columns: string;
}

const CommonRow = styled.div<CommonRow>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
`;

const StyledHeader = styled(CommonRow)`
  /* display: grid;
  grid-template-columns: 1fr 1.5fr 2fr 1fr 1fr 1fr; */
  padding: 1.4rem 1.2rem 1.4rem 0;
  border-bottom: 1px solid var(--color-grey-100);
  font-weight: 600;
  font-size: 1.6rem;
  color: var(--color-grey-600);
  text-transform: uppercase;
`;

const StyledRow = styled(CommonRow)`
  /* display: grid;
  grid-template-columns: 1fr 1.5fr 2fr 1fr 1fr 1fr; */
  padding: 0.6rem 1.2rem 0.3rem 0;

  border-bottom: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  align-items: center;
  background-color: var(--color-grey-0);
  position: relative;

  & div:last-child {
    justify-self: end;
  }

  &:last-child {
    border-bottom: none;
    border-bottom-left-radius: var(--border-radius-md);
    border-bottom-right-radius: var(--border-radius-md);
  }
`;

interface TableContext {
  columns: string;
}

const TableContext = createContext<TableContext>({
  columns: "",
});

function Header({ children }: { children: ReactNode }) {
  const { columns } = useTableContext();

  return (
    <StyledHeader role="rowheader" $columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Row({ children }: { children: ReactNode }) {
  const { columns } = useTableContext();

  return (
    <StyledRow role="row" $columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body() {}

function useTableContext() {
  const context = useContext(TableContext);

  if (context === undefined) throw new Error("The context is using outside the provider");

  return context;
}

function Table({ columns, children }: { children: ReactNode; columns: string }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;

export default Table;
