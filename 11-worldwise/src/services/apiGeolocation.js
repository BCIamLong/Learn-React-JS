import { BASE_URL } from "../configs/geoApi";

// const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export const getCityGeolocation = async (lat, lng) => {
  try {
    const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
    const data = await res.json();
    // console.log(data);
    // console.log(data);
    return {
      name: data.city || data.locality || "",
      country: data.countryName,
      position: {
        lat: data.latitude,
        lng: data.longitude,
      },
      countryCode: data.countryCode,
    };
  } catch (err) {
    throw new Error("Get city geolocation error!");
  }
};
