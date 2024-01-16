import styles from "./Customer.module.css";
import Form from "../../../components/Form";

function Customer() {
  return (
    <div className={styles.customer}>
      <h2>Creating new customer</h2>
      <Form>
        <div>
          <label htmlFor="fullName">Customer full name</label>
          <input id="fullName" type="text" />
        </div>
        <div>
          <label htmlFor="nationalId">National ID</label>
          <input id="nationalId" type="text" />
        </div>
        <button>Create new customer</button>
      </Form>
    </div>
  );
}

export default Customer;
