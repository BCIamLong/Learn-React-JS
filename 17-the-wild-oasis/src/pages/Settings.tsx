import Row from "../components/Row";
import SettingsTable from "../features/settings/SettingsTable";

function Settings() {
  return (
    <>
      <Row>Settings</Row>
      <Row>
        <SettingsTable />
      </Row>
    </>
  );
}

export default Settings;
