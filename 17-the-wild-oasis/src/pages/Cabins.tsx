import { useEffect } from "react";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(() => {
    async function fetchCabins() {
      const cabins = await getCabins();
      console.log(cabins);
    }
    fetchCabins();
  }, []);
  return <div>Cabins</div>;
}

export default Cabins;
