import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCities, postCity } from "../services/apiCities";
import { getCity } from "../services/apiCities";
// import { useNavigate } from "react-router-dom";

CitiesProvider.propTypes = {
  children: PropTypes.any,
};

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState({});
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const citiesData = await getCities();
        // console.log(citiesData);
        setCities(citiesData);
      } catch (err) {
        alert(err.message);
      }
      setIsLoading(false);
    };
    fetchCities();
  }, []);

  const fetchCity = async (id) => {
    try {
      setIsLoading(true);
      const cityData = await getCity(id);
      setCity(cityData);
    } catch (err) {
      // if (err.name === "AbortError") return;
      alert(err.message);
    }
    setIsLoading(false);
    // console.log(cityData);
  };

  const createCity = async (newCity) => {
    try {
      setIsLoading(true);
      await postCity(newCity);
      // setCities((cities) => [...cities, newCity]);
      setCities((cities) => [...cities, newCity]);
      // navigate("/app/cities");
    } catch (err) {
      alert(err.message);
    }
    setIsLoading(false);
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        // onSetCities: setCities,
        setCities,
        isLoading,
        setIsLoading,
        city,
        setCity,
        fetchCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context was using outside the CitiesProvider");

  return context;
};

export { useCities, CitiesProvider };
