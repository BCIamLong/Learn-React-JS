import Table from "~/components/Table";
import useCabins from "./useCabins";
import Spinner from "~/components/Spinner";
import CabinItem from "./CabinItem";
import Menu from "~/components/Menus";
import { useSearchParams } from "react-router-dom";

function CabinsTable() {
  const { cabins, error, isLoading } = useCabins();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "all";
  let cabinsFiltered;
  if (filter === "all") cabinsFiltered = cabins;
  if (filter === "no-discount") cabinsFiltered = cabins?.filter((cabin) => !cabin.discount);
  if (filter === "with-discount") cabinsFiltered = cabins?.filter((cabin) => cabin.discount);

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

        <Table.Body data={cabinsFiltered} render={(cabin) => <CabinItem cabin={cabin} key={cabin.id} />} />
        {/* <Table.Body data={cabins} render={(cabin) => <CabinItem cabin={cabin} key={cabin.id} />} /> */}

        {/* {cabins?.map()} */}
      </Table>
    </Menu>
  );
}

export default CabinsTable;
