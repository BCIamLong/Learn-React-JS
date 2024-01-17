import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Account from "../../features/accounts/Account";
import Customer from "../../features/customers/Customer";
import CustomerInfo from "../../features/customers/CustomerInfo";
import styles from "./ReduxBank.module.css";
import Balance from "../../features/accounts/Balance";

function ReduxBank() {
  const customer = useSelector((store) => store.customer.fullName);

  return (
    <div className={styles.bank}>
      <Header />
      {!customer ? (
        <Customer />
      ) : (
        <>
          <Balance />
          <CustomerInfo />
          <Account />
        </>
      )}
    </div>
  );
}

export default ReduxBank;
