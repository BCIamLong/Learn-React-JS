import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams?.get("lat") || searchParams?.get("latitude");
  const lng = searchParams?.get("lng") || searchParams?.get("longitude");
  return [lat, lng];
}

// export default useUrlPosition;
