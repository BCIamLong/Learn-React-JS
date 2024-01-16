import Header from "../Header";
import Account from "../../features/accounts/Account";
import Customer from "../../features/customers/Customer";
import styles from "./ReduxBank.module.css";

function ReduxBank() {
  return (
    <div className={styles.bank}>
      <Header />
      <Customer />
      <Account />
    </div>
  );
}

export default ReduxBank;
