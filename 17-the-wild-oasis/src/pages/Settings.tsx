import styled from "styled-components";
import Row from "../components/Row";
import SettingForm from "../features/settings/SettingsForm";

const StyledSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  form {
    width: 100%;
  }

  form div {
    width: 82% !important;
  }

  form label {
    width: 50%;
  }

  form input {
    width: 50%;
  }
`;

function Settings() {
  return (
    <StyledSettings>
      <Row>
        <h2>Settings</h2>
      </Row>
      <Row>
        <SettingForm />
      </Row>
    </StyledSettings>
  );
}

export default Settings;
