import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import {
  Marker,
  Popup,
  useMap,
  // useMapEvent,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import { useCities } from "../contexts/CitiesContext";
import PropTypes from "prop-types";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

// const makers = [
//   {
//     coords: [16, 108],
//     popup: "Hello",
//   },
//   {
//     coords: [18, 100],
//     popup: "Hello",
//   },
//   {
//     coords: [16, 105],
//     popup: "Hello",
//   },
// ];

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/9101/9101314.png",
  iconSize: [42, 42],
});

function Map() {
  const [center, setCenter] = useState([16, 108]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { cities } = useCities();
  const {
    handleGetPosition,
    position: geoPosition,
    isLoading: isLoadingPosition,
  } = useGeolocation();
  // const [center, setCenter] = useState([16, 108]);
  // const { id } = useParams();

  useEffect(() => {
    if (!geoPosition) return;

    setCenter([geoPosition.latitude, geoPosition.longitude]);
    // console.log(geoPosition);
    setSearchParams(geoPosition);
  }, [geoPosition]);

  useEffect(() => {
    const lat = searchParams?.get("lat");
    const lng = searchParams?.get("lng");
    if (!lat || !lng) return;
    // console.log(lat, lng);
    // console.log("ok");
    setCenter([lat, lng]);
  }, [searchParams]);

  // const handleUseYourPosition = () => {
  //   navigator.geolocation.getCurrentPosition((pos) => {
  //     const { latitude, longitude } = pos.coords;
  //     // console.log(pos.coords)
  //     setCenter([latitude, longitude]);
  //     // setSearchParams([latitude, longitude]);
  //     setSearchParams({ latitude, longitude });
  //   });
  // };
  // const handleClickMap = () => {
  //   navigate("form");
  // };

  return (
    // <div className={styles.map} onClick={handleClickMap} key={id}>
    <div className={styles.map}>
      <MapContainer center={center} zoom={9} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        {cities.map((city) => (
          <Marker key={city.id} position={city.position} icon={customIcon}>
            <Popup>
              <h2>
                <span>{city.emoji}</span>
                <span> {city.cityName}</span>
              </h2>
            </Popup>
          </Marker>
        ))}
        <Marker position={center} icon={customIcon}>
          <Popup>
            <h2></h2>
          </Popup>
        </Marker>

        {/* <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            <h2>hello</h2>
          </Popup>
        </Marker> */}
        <ChangeCenter position={center} />
        <DetectClick setCenter={setCenter} />
      </MapContainer>
      {/* <button onClick={handleUseYourPosition}>Use your position</button> */}
      {geoPosition?.latitude !== center[0] &&
        geoPosition?.longitude !== center[1] && (
          <Button type="position" onClick={handleGetPosition}>
            {isLoadingPosition ? "Loading..." : "Use your position"}
          </Button>
        )}
      {/* <button onClick={handleGetPosition}>Use your position</button> */}
    </div>
  );
}

ChangeCenter.propTypes = {
  position: PropTypes.any,
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

DetectClick.propTypes = {
  setCenter: PropTypes.func,
  setSearchParams: PropTypes.func,
};

function DetectClick({ setCenter }) {
  const navigate = useNavigate();
  // const map = useMapEvent("click", (e) => {
  // useMapEvent("click", (e) => {
  //   // console.log(e);
  //   // console.log(e.latlng);
  //   setCenter(e.latlng);
  //   const { lat: latitude, lng: longitude } = e.latlng;
  //   navigate(`form?lat=${latitude}&lng=${longitude}`);
  //   // console.log(latitude, longitude);

  //   setSearchParams({ latitude, longitude });
  // });
  // console.log(map);
  useMapEvents({
    click(e) {
      // map.locate();
      // console.log(e.latlng);
      // console.log(e);
      setCenter(e.latlng);
      const { lat: latitude, lng: longitude } = e.latlng;
      navigate(`form?lat=${latitude}&lng=${longitude}`);
    },
    // locationfound(e) {
    //   console.log(e.latlng);
    //   const { lat, lng } = e.latlng;
    //   setCenter([lat, lng]);
    //   map.flyTo(e.latlng, map.getZoom());
    // },
  });
  return null;
}

export default Map;
