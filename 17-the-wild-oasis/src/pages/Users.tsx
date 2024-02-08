import Row from "../components/Row";
import CreateUserForm from "../features/users/CreateUserForm";

function Users() {
  return (
    <>
      <Row>Users</Row>
      <Row>
        <CreateUserForm />
      </Row>
    </>
  );
}

export default Users;
