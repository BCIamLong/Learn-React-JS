import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  // useState,
} from "react";
import PropTypes from "prop-types";
import { deleteCity, getCities, postCity } from "../services/apiCities";
import { getCity } from "../services/apiCities";
// import { useNavigate } from "react-router-dom";

CitiesProvider.propTypes = {
  children: PropTypes.any,
};

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  city: {},
  error: "",
  // error: null,
};

function reducer(state, action) {
  const { cities } = state;
  const { type, payload } = action;
  switch (type) {
    case "loading":
      return { ...state, isLoading: true };
    // case "setCities":
    case "cities/loaded":
      return { ...state, cities: payload, isLoading: false };
    // return { ...state, cities: [...payload], isLoading: false };
    // case "setCity":
    case "city/loaded":
      return { ...state, city: payload, isLoading: false };

    // case "cities/created":
    case "city/created":
      return {
        ...state,
        cities: [...cities, payload],
        isLoading: false,
        city: payload,
      };

    // case "cities/deleted":
    case "city/deleted":
      return {
        ...state,
        cities: cities.filter((city) => city.id !== payload),
        isLoading: false,
        city: {},
      };

    case "rejected":
      return { ...state, error: payload, isLoading: false };

    default:
      throw new Error("Unknown action!");
    // case "setIsLoading":
    //   return { ...state, isLoading: !isLoading };
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [city, setCity] = useState({});
  // const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, isLoading, city, error } = state;

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);
        // dispatch({ type: "setIsLoading" });
        const citiesData = await getCities();

        dispatch({ type: "cities/loaded", payload: citiesData });
        // dispatch({ type: "setCities", payload: citiesData });
        // console.log(citiesData);
        // setCities(citiesData);
      } catch (err) {
        alert(err.message);
        dispatch({ type: "rejected", payload: err.message });
      }
      // dispatch({ type: "setIsLoading" });
      // setIsLoading(false);
    };
    fetchCities();
  }, []);

  const fetchCity = useCallback(
    async (id) => {
      console.log(id, city.id);
      if (+id === city.id) return;

      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);
        // dispatch({ type: "setIsLoading" });
        const cityData = await getCity(id);
        dispatch({ type: "city/loaded", payload: cityData });
        // dispatch({ type: "setCity", payload: cityData });
        // setCity(cityData);
      } catch (err) {
        // if (err.name === "AbortError") return;
        alert(err.message);
        dispatch({ type: "rejected", payload: err.message });
      }
      // dispatch({ type: "setIsLoading" });
      // setIsLoading(false);
      // console.log(cityData);
    },
    [city.id]
  );

  const createCity = async (newCity) => {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      // dispatch({ type: "setIsLoading" });
      await postCity(newCity);
      dispatch({ type: "city/created", payload: newCity });
      // dispatch({ type: "cities/loaded", payload: [...cities, newCity] });
      // dispatch({ type: "setCities", payload: [...cities, newCity] });
      // setCities((cities) => [...cities, newCity]);
      // setCities((cities) => [...cities, newCity]);
      // navigate("/app/cities");
    } catch (err) {
      alert(err.message);
      dispatch({ type: "rejected", payload: err.message });
    }
    // dispatch({ type: "setIsLoading" });
    // setIsLoading(false);
  };

  const removeCity = async (id) => {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);
      // dispatch({ type: "setIsLoading" });
      await deleteCity(id);
      dispatch({
        type: "city/deleted",
        payload: id,
      });
      // dispatch({
      //   type: "cities/deleted",
      //   payload: cities.filter((city) => city.id !== id),
      // });
      // dispatch({
      //   type: "cities/loaded",
      //   payload: cities.filter((city) => city.id !== id),
      // });
      // dispatch({
      //   type: "setCities",
      //   payload: cities.filter((city) => city.id !== id),
      // });
      // setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      alert(err.message);
      dispatch({ type: "rejected", payload: err.message });
    }
    // dispatch({ type: "setIsLoading" });
    // setIsLoading(false);
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        city,
        fetchCity,
        createCity,
        removeCity,
        // setCity: dispatch,
        // setIsLoading: dispatch,
        // setCities: dispatch,
        dispatch,
        error,
        // onSetCities: setCities,
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
