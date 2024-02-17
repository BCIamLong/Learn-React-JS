import { FocusEvent } from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

export default function SortBy({ options }: { options: { value: string; label: string }[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort") || "";

  function handleChange(e: FocusEvent<HTMLSelectElement>) {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  }

  return <Select currentVal={currentSort} onChange={handleChange} options={options} />;
}
