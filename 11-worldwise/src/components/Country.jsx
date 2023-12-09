import PropTypes from "prop-types";
import styles from "./Country.module.css";

Country.propTypes = {
  country: PropTypes.object,
};
function Country({ country }) {
  return (
    <li className={styles.item}>
      <p className={styles.code}>{country.emoji}</p>
      <p className={styles.name}>{country.country}</p>
    </li>
  );
}

export default Country;
