import styles from "./Cities.module.css";
import City from "./City";
import PropTypes from "prop-types";
import Message from "./Message";

Cities.propTypes = {
  cities: PropTypes.array,
};

function Cities({ cities }) {
  if (!cities.length)
    return (
      <Message message="Welcome you, les't add your first country you traveled by clicking on the map 🥰" />
    );
  return (
    <div className={styles.countries}>
      <ul className={styles.list}>
        {cities?.map((ct) => (
          <City key={ct.id} city={ct} />
        ))}
      </ul>
    </div>
  );
}

export default Cities;
