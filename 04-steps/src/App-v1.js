// * when we use data test like this we should put it out side why? because if we put it in component it will run twice because strict mode apply for root App component right
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt1 } from "react-icons/hi";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

// * we usually use App component for root which is the parent of all child components
export default function App() {
  // * the argument of useState() is default value of this state variable
  // * useState() will return array
  // * useState() is called hook in react, we can identify hooks because they start with this use keyword so all react functions that start with use like useEffect, useReducer, useState... are react hook
  // * we only call hooks like useState() on the top level of the function so of this component function, so only here is allowed to call useState()
  // * not inside if/else statement or inside another function or inside the loop
  // * and one important thing about state that we should only use setter function to update state not manually like step = step + 1
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handleStepNext() {
    // if (step === 3) return;
    if (step < 3) {
      // * we pass the callback function like the argument
      // * the argument will receive as in input the current value of state
      // setStep((s) => s + 1);
      // setStep((s) => s + 1);
      setStep(step + 1);
      setStep((step) => step + 1);
      console.log(step);
      // ! now the step is 1, but  setStep(step + 1); so step now 2 but it only possible in re-render cycle and to take this value we need to use callback function to take the previous state that 2 not current state is  right
    }
    // * so when we click to the next button it will call this function and call setter function setStep then update step
    // * and when step is update it will re-render app with new value and create new view component

    // step += 1;
    // console.log(step);
  }
  function handleStepPrevious() {
    // if (step > 1) setStep(step - 1);
    if (step > 1) setStep((s) => s - 1);
  }

  function handleOptionBtnClick() {
    // setIsOpen(!isOpen);
    setIsOpen((is) => !is);
  }

  return (
    <React.Fragment>
      <button className="option-btn show" onClick={handleOptionBtnClick}>
        {isOpen ? <AiOutlineClose /> : <HiMenuAlt1 />}
      </button>
      <div className={`step-container${isOpen ? "" : " hide"}`}>
        <Numbers step={step} />
        <Text message={`Step ${step}: ${messages[step - 1]}`} />
        <Buttons
          handleStepPrevious={handleStepPrevious}
          handleStepNext={handleStepNext}
        />
      </div>
    </React.Fragment>
  );
}

function Numbers({ step }) {
  return (
    <div className="step-num">
      <p className="active">1</p>
      <p className={step >= 2 ? "active" : " "}>2</p>
      <p className={step >= 3 ? "active" : " "}>3</p>
    </div>
  );
}

function Text({ message }) {
  return (
    <div className="step-text">
      <p>{message}</p>
    </div>
  );
}

function Buttons({ handleStepPrevious, handleStepNext }) {
  return (
    <div className="step-btn">
      <button onClick={handleStepPrevious}>Previous</button>
      <button
        onClick={handleStepNext}
        // onMouseEnter={() => alert("Click you will good")}
      >
        Next
      </button>
    </div>
  );
}
