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
  return (
    <div>
      Cabins
      <img
        src="https://xyinqkbbdbmknpwnrucc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"
        alt=""
      />
    </div>
  );
}

export default Cabins;
