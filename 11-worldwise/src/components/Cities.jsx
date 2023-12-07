import styles from "./Cities.module.css";

function Cities() {
  return (
    <div className={styles.cities}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <p className={styles.code}>PT</p>
          <p className={styles.name}>Portugal</p>
        </li>
        <li className={styles.item}>
          <p className={styles.code}>PT</p>
          <p className={styles.name}>Portugal</p>
        </li>
        <li className={styles.item}>
          <p className={styles.code}>PT</p>
          <p className={styles.name}>Portugal</p>
        </li>
      </ul>
    </div>
  );
}

export default Cities;
