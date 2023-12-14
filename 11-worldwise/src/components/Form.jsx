// import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Spinner from "../components/Spinner";
// import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { getCityGeolocation } from "../services/apiGeolocation";
import Message from "../components/Message";
import getCountryEmoji from "../utils/getCountryEmoji";

function Form() {
  // const navigate = useNavigate();
  const [formLat, formLng] = useUrlPosition();
  const [city, setCity] = useState({});
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [geoError, setGeoError] = useState(null);
  const date = new Date();
  const dateFormat = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  // const [setSearchParams] = useSearchParams();
  // console.log(formLat, formLng);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        setGeoError(null);
        setIsLoadingGeolocation(true);
        const city = await getCityGeolocation(formLat, formLng);
        // console.log(cityName);
        console.log(!city.countryCode);
        if (!city.countryCode)
          throw new Error(
            "🤨 That doesn't seem to be a city, click somewhere else 😉"
          );
        setCity(city);
        // setSearchParams([formLat, formLng]);
      } catch (err) {
        setGeoError(err.message);
      }
      setIsLoadingGeolocation(false);
    };
    fetchCity();
  }, [formLat, formLng]);

  if (isLoadingGeolocation) return <Spinner />;

  // if (city?.name.startsWith("Etc/"))
  //   return (
  //     <Message message="🤨 That doesn't seem to be a city, click somewhere else 😉" />
  //   );

  if (geoError) return <Message message={geoError} />;

  return (
    <form className={styles.form}>
      <div className={styles.formItem}>
        <label htmlFor="city">City name</label>
        <input id="city" type="text" defaultValue={city?.name} />
        <span>{city.countryCode && getCountryEmoji(city.countryCode)}</span>
      </div>
      <div className={styles.formItem}>
        <label htmlFor="date">When did you go to NAME_CITY?</label>
        <input id="date" type="text" defaultValue={dateFormat} />
      </div>
      <div className={styles.formItem}>
        <label htmlFor="note">Notes about your trip to NAME_CITY</label>
        <textarea id="note"></textarea>
      </div>
      <div className={styles.btnGroup}>
        {/* <button>Add</button> */}
        {/* <button>&larr;Back</button> */}
        {/* <Button type="add">Add</Button> */}
        <Button type="primary">Add</Button>
        <BackButton />
        {/* <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr;Back
        </Button> */}
      </div>
    </form>
  );
}

export default Form;
