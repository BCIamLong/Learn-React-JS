import { useParams } from "react-router-dom";
import styles from "./CityDetail.module.css";
// import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getCity } from "../services/apiCities";

// CityDetail.propTypes = {
//   setIsLoading: PropTypes.func,
// };

const formatDate = (date) => {
  if (!date) return;
  const format = Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    weekday: "long",
  }).format(new Date(date));
  return format;
};

function CityDetail() {
  // const param = useParams();
  const { id } = useParams();
  const [city, setCity] = useState({});
  // console.log(param);
  const { cityName, notes, date, emoji } = city;
  useEffect(() => {
    const fetchCity = async () => {
      try {
        const cityData = await getCity(id);
        setCity(cityData);
      } catch (err) {
        alert(err.message);
      }
      // console.log(cityData);
    };
    fetchCity();
  }, [id]);

  return (
    <div className={styles.cityDetail}>
      <div className={styles.detail}>
        <p className={styles.tittle}>CITY NAME</p>
        <p className={styles.content}>
          <span>{emoji}</span> {cityName}
        </p>
      </div>
      <div className={styles.detail}>
        <p className={styles.tittle}>YOU WENT TO LISBON ON</p>
        <p className={styles.content}>{formatDate(date)}</p>
      </div>
      <div className={styles.detail}>
        <p className={styles.tittle}>YOUR NOTES</p>
        <p className={styles.content}>{!notes ? "No notes yet" : notes}</p>
      </div>
      <div className={styles.detail}>
        <p className={styles.tittle}>LEARN MORE</p>
        <p className={styles.content}>
          <a href={`https://en.wikipedia.org/wiki/${cityName}`}>
            Check out {cityName} on Wikipedia &rarr;
          </a>
        </p>
      </div>
      <button className={styles.btn}>&larr; Back</button>
    </div>
  );
}

export default CityDetail;
