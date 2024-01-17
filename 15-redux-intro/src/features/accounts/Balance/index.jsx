import { useSelector } from "react-redux";
import styles from "./Balance.module.css";

function Balance() {
  const balance = useSelector((store) => store.account.balance);
  return (
    <div className={styles.balance}>
      <p>${balance.toFixed(2)}</p>
    </div>
  );
}

export default Balance;
