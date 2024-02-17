import { Filter } from "~/components/Filter";

export default function CabinOperations() {
  return (
    <div>
      <Filter
        filterField="filter"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
    </div>
  );
}
