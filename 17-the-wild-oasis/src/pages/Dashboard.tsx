import Row from "~/components/Row";
import DashboardFilter from "~/features/dashboard/DashboardFilter";
import DashboardLayout from "~/layouts/DashboardLayout";

function Dashboard() {
  return (
    <>
      <Row $type="horizontal">
        <h2>Dashboard</h2>
        <DashboardFilter />
      </Row>
      <DashboardLayout>
        <div>Statistics</div>
        <div>Today's activity</div>
        <div>Chart stay durations</div>
        <div>Chart sales</div>
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
