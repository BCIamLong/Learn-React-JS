import { useSelector } from "react-redux";
import styles from "./CustomerInfo.module.css";

function CustomerList() {
  const customer = useSelector((store) => store.customer);

  return (
    <div className={styles.customerInfo}>
      <h2>👋 Welcome {customer.fullName}</h2>
    </div>
  );
}

export default CustomerList;
