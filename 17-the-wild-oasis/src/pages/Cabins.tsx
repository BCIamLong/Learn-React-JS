import Row from "../components/Row";
import CabinsTable from "../features/cabins/CabinsTable";

function Cabins() {
  return (
    <>
      <Row $type="horizontal">
        <div>Table</div>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinsTable />
      </Row>
    </>
  );
}

export default Cabins;
