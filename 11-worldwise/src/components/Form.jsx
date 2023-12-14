import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContext";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { getCityGeolocation } from "../services/apiGeolocation";
// import { postCity } from "../services/apiCities";
import getCountryEmoji from "../utils/getCountryEmoji";
// import { useNavigate } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [formLat, formLng] = useUrlPosition();
  const [city, setCity] = useState({});
  // const [cityName, setCityName] = useState("");
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [geoError, setGeoError] = useState(null);
  const [notes, setNotes] = useState("");
  // const navigate = useNavigate();
  const { createCity } = useCities();
  const [date, setDate] = useState(new Date());
  // console.log(date);

  // const curDate = new Date();
  // const dateFormat = `${curDate.getDate()}/${
  //   curDate.getMonth() + 1
  // }/${curDate.getFullYear()}`;
  // const [setSearchParams] = useSearchParams();
  // console.log(formLat, formLng);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !city.name) return;
    // console.log("ok");

    const { name, country, position, countryCode } = city;
    const newCity = {
      id: Date.now(),
      cityName: name,
      country,
      position,
      date,
      // date: new Date(),
      emoji: getCountryEmoji(countryCode),
      notes,
    };
    // console.log(newCity);
    await createCity(newCity);

    navigate("/app/cities");
    // navigate("/app");
    // try {
    //   await postCity(newCity);
    //   setCities((cities) => [...cities, newCity]);
    //   navigate("/app/cities");
    // } catch (err) {
    //   setGeoError(err.message);
    // }
    // console.log(newCity);
    // console.log("hello");
  };

  useEffect(() => {
    if (!formLat || !formLng) return;
    const fetchCity = async () => {
      try {
        setGeoError(null);
        setIsLoadingGeolocation(true);
        const city = await getCityGeolocation(formLat, formLng);
        // console.log(cityName);
        // console.log(!city.countryCode);
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

  if (!formLat || !formLng)
    return <Message message="👉 Start by clicking somewhere on the map 👈 " />;

  if (isLoadingGeolocation) return <Spinner />;

  if (geoError) return <Message message={geoError} />;

  // if (city?.name.startsWith("Etc/"))
  //   return (
  //     <Message message="🤨 That doesn't seem to be a city, click somewhere else 😉" />
  //   );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formItem}>
        <label htmlFor="city">City name</label>
        <input id="city" type="text" defaultValue={city?.name} required />
        <span className={styles.emoji}>
          {city.countryCode && getCountryEmoji(city.countryCode)}
        </span>
      </div>
      <div className={styles.formItem}>
        <label htmlFor="date">When did you go to {city?.name}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          // locale="es"
          dateFormat="dd/MM/yyyy"
        />
        {/* <input id="date" type="text" defaultValue={dateFormat} /> */}
      </div>
      <div className={styles.formItem}>
        <label htmlFor="note">Notes about your trip to {city?.name}</label>
        <textarea
          id="note"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        ></textarea>
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
