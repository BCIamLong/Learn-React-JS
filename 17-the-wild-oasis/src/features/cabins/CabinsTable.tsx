import styled from "styled-components";
import CabinItem from "./CabinItem";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../components/Spinner";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1.5fr 2fr 1fr 1fr 1fr;
  padding: 1.4rem 1.2rem 1.4rem 0;
  border-bottom: 1px solid var(--color-grey-100);
  font-weight: 600;
  font-size: 1.6rem;
  color: var(--color-grey-600);
  text-transform: uppercase;
`;

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  width: 100%;
  /* overflow: hidden; */
`;

function CabinsTable() {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isLoading) return <Spinner />;

  if (error) return;

  return (
    <Table role="table">
      <TableHeader role="rowheader">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>

      {cabins?.map((cabin) => (
        <CabinItem cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinsTable;
