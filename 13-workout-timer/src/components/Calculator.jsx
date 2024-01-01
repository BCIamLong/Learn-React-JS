import { memo, useCallback, useEffect, useState } from "react";
import PropsType from "prop-types";
import clickSound from "../assets/ClickSound.m4a";

Calculator.propTypes = {
  workouts: PropsType.array,
  allowSound: PropsType.bool,
};

// const playSound = function (allowSound) {
//   if (!allowSound) return;
//   const sound = new Audio(clickSound);
//   sound.play();
// };

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState(0);

  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;

  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  // const playSound = function () {
  //   if (!allowSound) return;
  //   const sound = new Audio(clickSound);
  //   sound.play();
  // };

  // const playSound = useCallback(
  //   function () {
  //     if (!allowSound) return;
  //     const sound = new Audio(clickSound);
  //     sound.play();
  //   },
  //   [allowSound]
  // );

  const handleClickIncrease = () => {
    setDuration(
      (duration) => Math.floor(duration) + 1
      // duration > Math.floor(duration) ? Math.ceil(duration) : duration + 1
    );
    // playSound();
    // playSound(allowSound);
  };

  const handleClickDecrease = () => {
    // if (duration === 0) return;
    setDuration(
      (duration) => (!duration ? duration : Math.ceil(duration) - 1)
      // duration > Math.floor(duration) ? Math.floor(duration) : duration - 1
    );
    // playSound();
    // playSound(allowSound);
  };

  useEffect(() => {
    const playSound = function () {
      if (!allowSound) return;
      const sound = new Audio(clickSound);
      sound.play();
    };

    playSound();
  }, [duration, allowSound]);

  useEffect(() => {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
    // playSound();
    // console.log("ok");
  }, [number, sets, speed, durationBreak]);
  // }, [number, sets, speed, durationBreak, playSound]);
  // console.log("ok");

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        {/* <button onClick={() => setDuration((duration) => duration - 1)}> */}
        <button onClick={handleClickDecrease}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        {/* <button onClick={() => setDuration((duration) => duration + 1)}> */}
        <button onClick={handleClickIncrease}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
