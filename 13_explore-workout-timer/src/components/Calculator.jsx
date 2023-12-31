import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Calculator.module.css";
import { useEffect } from "react";
import workoutSound from "../assets/ClickSound.m4a";

Calculator.propTypes = {
  mute: PropTypes.bool,
};

function Calculator({ mute }) {
  const [time, setTime] = useState(Date.now());
  const [type, setType] = useState(9);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(60);
  const [length, setLength] = useState(3);

  const dateFormat = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
  const timeFormat = new Date(time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  // (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const workoutTime = Math.round(
    (type * sets * speed) / 60 + (sets - 1) * length
  );
  // console.log(workoutTime);

  const workoutTimeFormat = workoutTime < 1 ? `0${workoutTime}` : workoutTime;
  // console.log(workoutTimeFormat);

  const finishSound = () => {
    if (!mute) return;
    const sound = new Audio(workoutSound);
    sound.play();
  };

  useEffect(() => {
    const idInterval = setInterval(() => {
      setTime((time) => time + 1000);
    }, 1000);

    return () => clearInterval(idInterval);
  }, []);

  return (
    <div className={styles.calculator}>
      <div className={styles.header}>
        <h1 className={styles.heading}>WORKOUT TIMER</h1>
        <div className={styles.date}>
          <p>
            FOR YOUR WORKOUT ON {dateFormat}, {timeFormat}
          </p>
        </div>
      </div>
      <div className={styles.calculatorBox}>
        <div className={styles.item}>
          <p>Type of workout</p>
          <select
            name="type-workout"
            id={styles.typeWorkout}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="9">Full-body workout (9 exercises)</option>
            <option value="6">Arms + Legs (6 exercises)</option>
            <option value="3">Arms only (3 exercises)</option>
            <option value="4">Legs only (4 exercises)</option>
            <option value="4">Core only (4 exercises)</option>
          </select>
        </div>
        <div className={styles.item}>
          <p>How many sets?</p>
          <div>
            <input
              name="sets"
              type="range"
              min={1}
              max={9}
              value={sets}
              onChange={(e) => setSets(+e.target.value)}
            />
            <label htmlFor="sets">{sets}</label>
          </div>
        </div>
        <div className={styles.item}>
          <p>How fast are you?</p>
          <div>
            <input
              name="speed"
              type="range"
              min={10}
              step={10}
              max={90}
              value={speed}
              onChange={(e) => setSpeed(+e.target.value)}
            />
            <label htmlFor="speed">{speed} sec/exercise</label>
          </div>
        </div>
        <div className={styles.item}>
          <p>Break length</p>
          <div>
            <input
              name="length"
              type="range"
              min={1}
              max={5}
              value={length}
              onChange={(e) => setLength(+e.target.value)}
            />
            <label htmlFor="length">{length} minutes/break</label>
          </div>
        </div>
      </div>

      <div className={styles.timerBox}>
        <p>-</p>
        <p className={styles.timer}>{workoutTimeFormat}:00</p>
        <p>+</p>
      </div>
    </div>
  );
}

export default Calculator;
