import { NavLink } from "react-router-dom";
import styles from "./Filter.module.css";

function Filter() {
  return (
    <div className={styles.filter}>
      <ul>
        <li className={styles.clicked}>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Filter;
