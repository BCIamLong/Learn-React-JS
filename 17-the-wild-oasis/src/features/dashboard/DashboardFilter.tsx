import { Filter } from "~/components/Filter";

export default function DashboardFilter() {
  return (
    <Filter
      defaultFilter="7-days"
      filterField="last"
      options={[
        {
          value: "7-days",
          label: "Last 7 days",
        },
        {
          value: "30-days",
          label: "Last 30 days",
        },
        {
          value: "90-days",
          label: "Last 90 days",
        },
      ]}
    />
  );
}
