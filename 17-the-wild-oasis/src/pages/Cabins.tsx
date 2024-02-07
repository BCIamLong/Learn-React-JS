import { useState } from "react";
import Button from "../components/Button";
import Row from "../components/Row";
import CabinsTable from "../features/cabins/CabinsTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Popup from "../components/Popup";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row $type="horizontal">
        <div>Table</div>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinsTable />

        <Button $size="medium" onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && (
          <Popup onShow={() => setShowForm((show) => !show)}>
            <CreateCabinForm />
          </Popup>
        )}
        {/* {showForm && <CreateCabinForm />} */}

        {/* <Popup>
          <CreateCabinForm />
        </Popup> */}
      </Row>
    </>
  );
}

export default Cabins;
