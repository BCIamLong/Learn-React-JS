import Row from "../components/Row";
import CabinsTable from "../features/cabins/CabinsTable";
import { AddCabin } from "~/features/cabins/AddCabin";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  return (
    <>
      <Row $type="horizontal">
        <div>Table</div>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinsTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
