import styles from "./Filter.module.css";

function Filter() {
  return (
    <div className={styles.filter}>
      <ul>
        <li className={styles.clicked}>Cities</li>
        <li>Countries</li>
      </ul>
    </div>
  );
}

export default Filter;
