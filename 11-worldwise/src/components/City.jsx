import styles from "./City.module.css";
import PropTypes from "prop-types";
import formatDate from "../utils/formatDate";
import { useCities } from "../contexts/CitiesContext";
// import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

City.propTypes = {
  city: PropTypes.object,
};

// const formatDate = (date) => {
// const dateFormat = new Date(date).toLocaleDateString("en-US", {
//   month: "long",
//   day: "2-digit",
//   year: "numeric",
// });
//   const format = Intl.DateTimeFormat("en", {
//     year: "numeric",
//     month: "long",
//     day: "2-digit",
//   }).format(new Date(date));
//   return format;
// };

function City({ city }) {
  const { city: currentCity, removeCity } = useCities();
  const { emoji, cityName, date } = city;
  // const navigate = useNavigate();

  // const dateFormat = new Date(date).toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "2-digit",
  //   year: "numeric",
  // });
  const handleClick = (e) => {
    e.preventDefault();
    removeCity(city.id);
    // console.log("ok");
    // navigate(0);
    // navigate("/app/cities");
  };

  return (
    <li
      className={`${styles.item} ${
        city.id === currentCity.id ? `${styles.selected}` : ""
      }`}
    >
      <div className={styles.info}>
        <p className={styles.code}>{emoji}</p>
        <p className={styles.name}>{cityName}</p>
      </div>
      <p className={styles.date}>({formatDate(date)})</p>
      <button className={styles.btn} onClick={handleClick}>
        &times;
      </button>
    </li>
  );
}

export default City;
