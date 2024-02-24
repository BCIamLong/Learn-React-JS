import Row from "~/components/Row";
import UpdatePasswordForm from "~/features/authentication/UpdatePasswordForm";
import UpdateProfileForm from "~/features/authentication/UpdateProfileForm";

function Account() {
  return (
    <>
      <Row>
        <h2>Update your account</h2>
      </Row>
      <Row>
        <h3>Update user data</h3>
        <UpdateProfileForm />
      </Row>
      <Row>
        <h3>Update password</h3>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
