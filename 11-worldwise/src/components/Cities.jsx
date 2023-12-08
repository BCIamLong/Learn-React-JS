import styles from "./Cities.module.css";

function Cities() {
  return (
    <div className={styles.countries}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.info}>
            <p className={styles.code}>PT</p>
            <p className={styles.name}>Lisbon</p>
          </div>

          <p className={styles.date}>(October 31, 2027)</p>
          <button className={styles.btn}>&times;</button>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <p className={styles.code}>PT</p>
            <p className={styles.name}>Lisbon</p>
          </div>

          <p className={styles.date}>(October 31, 2027)</p>
          <button className={styles.btn}>&times;</button>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <p className={styles.code}>PT</p>
            <p className={styles.name}>Lisbon</p>
          </div>

          <p className={styles.date}>(October 31, 2027)</p>
          <button className={styles.btn}>&times;</button>
        </li>
      </ul>
    </div>
  );
}

export default Cities;
