import PropTypes from "prop-types";
import styles from "./Countries.module.css";
import Country from "./Country";

Countries.propTypes = {
  cities: PropTypes.array,
};

// const getCountries = (cities) => {
//   const countries = [];

//   cities.forEach((city) => {
//     if (!countries.find((ct) => ct.country === city.country))
//       countries.push({ emoji: city.emoji, country: city.country });
//   });

//   return countries;
// };

function Countries({ cities }) {
  // const countries = getCountries(cities);
  const countries = cities.reduce((arr, city) => {
    if (!arr.find((ct) => ct.country === city.country))
      return [...arr, { emoji: city.emoji, country: city.country }];
    return arr;
  }, []);

  return (
    <div className={styles.cities}>
      <ul className={styles.list}>
        {countries?.map((ct, i) => (
          <Country key={i} country={ct} />
        ))}
      </ul>
    </div>
  );
}

export default Countries;
