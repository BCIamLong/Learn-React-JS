import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCities } from "../services/apiCities";

CitiesProvider.propTypes = {
  children: PropTypes.any,
};

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <CitiesContext.Provider
      value={{
        cities,
        // onSetCities: setCities,
        isLoading,
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
