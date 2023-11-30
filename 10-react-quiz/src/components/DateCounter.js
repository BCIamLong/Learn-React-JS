import { useReducer, useState } from "react";

function reducer(state, action) {
  // console.log(state, action);
  const { type, payload } = action;
  if (type === "dec") return state - payload;
  if (type === "inc") return state + payload;
  if (type === "setCount") return payload;
  if (type === "reset") return payload;
  // return payload;
}

export default function DateCounter() {
  const [step, setStep] = useState(1);
  // const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(reducer, 0);

  const date = new Date(
    Date.now() + count * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "2-digit",
  });

  const handleDecrease = () => {
    dispatch({ type: "dec", payload: step });
    // setCount((count) => count - step);
  };

  const handleIncrease = () => {
    // setCount((count) => count + step);
    dispatch({ type: "inc", payload: step });
  };

  const handleReset = () => {
    setStep(1);
    // setCount(0);
    dispatch({ type: "reset", payload: 0 });
  };

  const handleChange = (e) => {
    dispatch({ type: "setCount", payload: e.target.value });
  };

  return (
    <div className="date-counter">
      <div className="range">
        <input
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={(e) => setStep(+e.target.value)}
        />
        <span>{step}</span>
      </div>
      <div className="counter">
        <button onClick={handleDecrease}>-</button>
        <input
          type="text"
          value={count}
          // onChange={(e) => setCount(+e.target.value)}
          onChange={handleChange}
        />
        <button onClick={handleIncrease}>+</button>
      </div>
      <p className="date">{date}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
