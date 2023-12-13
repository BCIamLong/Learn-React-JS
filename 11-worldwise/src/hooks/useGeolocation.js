import { useState } from "react";

export function useGeolocation(defaultPosition = null, callback) {
  // const [position, setPosition] = useState({});
  const [position, setPosition] = useState(defaultPosition);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleGetPosition() {
    if (!navigator.geolocation)
      return setError("Your browser doesn't support geolocation API");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      // const { latitude: lat, longitude: long } = position.coords;
      // setPosition({ lat, long });
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
      // const url = `https://www.openstreetmap.org/#map=16/${lat}/${long}`;
      // console.log(url);
      //   console.log(typeof callback);
      callback?.();
      setIsLoading(false);
    });
  }
  return { handleGetPosition, position, isLoading, error };
}
