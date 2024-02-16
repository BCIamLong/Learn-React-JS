import Table from "~/components/Table";
import useCabins from "./useCabins";
import Spinner from "~/components/Spinner";
import CabinItem from "./CabinItem";

function CabinsTable() {
  const { cabins, error, isLoading } = useCabins();

  if (isLoading) return <Spinner />;

  if (error) return;

  return (
    <Table columns="1fr 1.5fr 2fr 1fr 1fr 0.8fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      {cabins?.map((cabin) => (
        <CabinItem cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinsTable;
