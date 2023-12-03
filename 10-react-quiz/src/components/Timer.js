import { useEffect } from "react";

function Timer({ timer, dispatch }) {
  const minute = Math.floor(timer / 60);
  const minuteFormat = minute.toString().length === 1 ? `0${minute}` : minute;

  const seconds = timer % 60 === 0 ? 0 : timer - minute * 60;
  const secondsFormat =
    seconds.toString().length === 1 ? `0${seconds}` : seconds;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer === 0) {
        dispatch({ type: "finish" });
        return clearInterval(intervalId);
      }
      dispatch({ type: "setTimer" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer, dispatch]);
  return (
    <div className="timer">
      {minuteFormat}:{secondsFormat}
    </div>
  );
}

export default Timer;
