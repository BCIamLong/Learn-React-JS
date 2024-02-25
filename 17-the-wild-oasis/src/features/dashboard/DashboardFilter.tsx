import { Filter } from "~/components/Filter";

export default function DashboardFilter() {
  return (
    <Filter
      defaultFilter="last-days-7"
      filterField="last"
      options={[
        {
          value: "last-days-7",
          label: "Last 7 days",
        },
        {
          value: "last-days-30",
          label: "Last 30 days",
        },
        {
          value: "last-days-90",
          label: "Last 90 days",
        },
      ]}
    />
  );
}
