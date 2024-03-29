import Row from "../components/Row";
import CabinsTable from "../features/cabins/CabinsTable";
import { AddCabin } from "~/features/cabins/AddCabin";
import CabinOperations from "~/features/cabins/CabinOperations";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  return (
    <>
      <Row $type="horizontal">
        <h2>Cabins</h2>
        {/* <p>Filter / Sort</p> */}
        <CabinOperations />
      </Row>
      <Row>
        <CabinsTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
