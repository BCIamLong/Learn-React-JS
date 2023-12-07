import styles from "./Copyright.module.css";

function Copyright() {
  return (
    <div className={styles.copyright}>
      <p>&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
    </div>
  );
}

export default Copyright;
