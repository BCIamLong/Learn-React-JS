import Row from "~/components/Row";
import DashboardBox from "~/features/dashboard/DashboardBox";
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
        <DashboardBox />
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
