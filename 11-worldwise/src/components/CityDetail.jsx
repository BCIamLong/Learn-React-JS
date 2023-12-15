import { Link, useParams } from "react-router-dom";
import styles from "./CityDetail.module.css";
// import PropTypes from "prop-types";
import { useEffect } from "react";
// import { getCity } from "../services/apiCities";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

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
  // const [city, setCity] = useState({});
  const { city, fetchCity, isLoading } = useCities();
  // const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();

  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  // console.log(lat, lng);
  // console.log(param);
  const { cityName, notes, date, emoji } = city;
  useEffect(() => {
    if (city.id === +id) return;
    // const controller = new AbortController();
    fetchCity(id);

    // return () => controller.abort();
  }, [id, city]);

  // useEffect(() => {
  //   const fetchCity = async () => {
  //     console.log("ok");
  //     try {
  //       setIsLoading(true);
  //       const cityData = await getCity(id);
  //       setCity(cityData);
  //     } catch (err) {
  //       alert(err.message);
  //     }
  //     setIsLoading(false);
  //     // console.log(cityData);
  //   };
  //   fetchCity();
  // }, [id]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.cityDetail}>
      <div className={styles.detail}>
        <p className={styles.tittle}>CITY NAME</p>
        <p className={styles.content}>
          <span>{cityName}</span>
          <span className={styles.emoji}>{emoji}</span>
        </p>
      </div>
      <div className={styles.detail}>
        <p className={styles.tittle}>YOU WENT TO {cityName} ON</p>
        <p className={styles.content}>{formatDate(date)}</p>
      </div>
      <div className={styles.detail}>
        <p className={styles.tittle}>YOUR NOTES</p>
        <p className={styles.content}>{!notes ? "No notes yet" : notes}</p>
      </div>
      <div className={styles.detail}>
        <p className={styles.tittle}>LEARN MORE</p>
        <p className={styles.content}>
          <Link
            to={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
          >
            Check out {cityName} on Wikipedia &rarr;
          </Link>
        </p>
      </div>
      <BackButton />
      {/* <button className={styles.btn} onClick={() => navigate(-1)}>
        &larr; Back
      </button> */}
    </div>
  );
}

export default CityDetail;
