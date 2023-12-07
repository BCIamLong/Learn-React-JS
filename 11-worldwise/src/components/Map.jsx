import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import styles from "./Map.module.css";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { Icon } from "leaflet";

const makers = [
  {
    coords: [16, 108],
    popup: "Hello",
  },
  {
    coords: [18, 100],
    popup: "Hello",
  },
  {
    coords: [16, 105],
    popup: "Hello",
  },
];

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/9101/9101314.png",
  iconSize: [42, 42],
});

function Map() {
  const [center, setCenter] = useState([16, 108]);

  const handleUseYourPosition = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      // console.log(pos.coords)
      setCenter([latitude, longitude]);
    });
  };

  return (
    <div className={styles.map}>
      <MapContainer center={center} zoom={9} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        {makers.map((mrk, i) => (
          <Marker key={i} position={mrk.coords} icon={customIcon}>
            <Popup>
              <h2>{mrk.popup}</h2>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <button onClick={handleUseYourPosition}>Use your position</button>
    </div>
  );
}

export default Map;
