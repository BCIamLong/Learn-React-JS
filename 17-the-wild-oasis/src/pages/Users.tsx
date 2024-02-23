import SignUpForm from "~/features/authentication/SignUpForm";
import Row from "../components/Row";
import styled from "styled-components";

const UserPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  form {
    width: 100%;
  }

  form div div {
    width: 48rem !important;
  }

  form label {
    width: 40% !important ;
  }

  form input {
    width: 52% !important;
  }
`;

function Users() {
  return (
    <UserPage>
      <Row>
        <h2>Create a new user</h2>
      </Row>
      <Row>
        <SignUpForm />
      </Row>
    </UserPage>
  );
}

export default Users;
