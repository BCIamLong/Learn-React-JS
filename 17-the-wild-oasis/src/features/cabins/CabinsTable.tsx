import Table from "~/components/Table";
import useCabins from "./useCabins";
import Spinner from "~/components/Spinner";
import CabinItem from "./CabinItem";
import Menu from "~/components/Menus";

function CabinsTable() {
  const { cabins, error, isLoading } = useCabins();

  if (isLoading) return <Spinner />;

  if (error) return;

  return (
    <Menu>
      <Table columns="1fr 1.5fr 2fr 1fr 1fr 0.8fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body data={cabins} render={(cabin) => <CabinItem cabin={cabin} key={cabin.id} />} />

        {/* {cabins?.map()} */}
      </Table>
    </Menu>
  );
}

export default CabinsTable;
