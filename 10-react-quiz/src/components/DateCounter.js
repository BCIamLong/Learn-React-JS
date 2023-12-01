import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  // console.log(state, action);
  const { type, payload } = action;
  const { count, step } = state;

  // if (type === "dec") return { ...state, count: count - step };
  // if (type === "inc") return { ...state, count: count + step };
  // if (type === "setCount") return { ...state, count: payload };
  // if (type === "setStep") return { ...state, step: payload };
  // if (type === "reset") return { count: 0, step: 1 };

  switch (type) {
    case "dec":
      return { ...state, count: count - step };
    case "inc":
      return { ...state, count: count + step };
    case "setCount":
      return { ...state, count: payload };
    case "setStep":
      return { ...state, step: payload };
    case "reset":
      // return { count: 0, step: 1 };
      return initialState;
    default:
      throw new Error("Unknown action");
  }
  // console.log(newState);

  // return payload;
}

export default function DateCounter() {
  // const [step, setStep] = useState(1);
  // const [count, setCount] = useState(0);
  // const [step, dispatchStep] = useReducer(reducer, 1);
  // const [count, dispatch] = useReducer(reducer, 0);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const date = new Date(
    Date.now() + count * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "2-digit",
  });

  const handleDecrease = () => {
    // dispatch({ type: "dec", payload: step });
    // setCount((count) => count - step);
    dispatch({ type: "dec" });
  };

  const handleIncrease = () => {
    // setCount((count) => count + step);
    // dispatch({ type: "inc", payload: step });
    dispatch({ type: "inc" });
  };

  const handleReset = () => {
    // setStep(1);
    // setCount(0);
    // dispatch({ type: "reset", payload: 0 });
    // dispatch({ type: "reset", payload: 0 });
    dispatch({ type: "reset" });
  };

  const handleChange = (e) => {
    // dispatch({ type: "setCount", payload: +e.target.value });
    dispatch({ type: "setCount", payload: +e.target.value });
  };

  const handleSetStep = (e) => {
    dispatch({ type: "setStep", payload: +e.target.value });
  };

  return (
    <div className="date-counter">
      <div className="range">
        <input
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={handleSetStep}
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
