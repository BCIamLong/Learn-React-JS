import { useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import ToggleSounds from "./components/ToggleSounds";

function App() {
  const [mute, setMute] = useState(false);
  return (
    <div className="container">
      <Calculator mute={mute} />
      <ToggleSounds mute={mute} onSetMute={setMute} />
    </div>
  );
}

export default App;
