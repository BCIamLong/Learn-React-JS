import styles from "./City.module.css";
import PropTypes from "prop-types";

City.propTypes = {
  city: PropTypes.object,
};

const formatDate = (date) => {
  // const dateFormat = new Date(date).toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "2-digit",
  //   year: "numeric",
  // });
  const format = Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(date));
  return format;
};

function City({ city }) {
  const { emoji, cityName, date } = city;
  // const dateFormat = new Date(date).toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "2-digit",
  //   year: "numeric",
  // });

  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <p className={styles.code}>{emoji}</p>
        <p className={styles.name}>{cityName}</p>
      </div>
      <p className={styles.date}>({formatDate(date)})</p>
      <button className={styles.btn}>&times;</button>
    </li>
  );
}

export default City;
