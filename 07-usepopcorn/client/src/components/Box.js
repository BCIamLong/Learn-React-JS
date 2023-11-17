import { useState } from "react";
import Button from "./Button";

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <Button onBtnClick={setIsOpen}>
        {isOpen ? <span>&#8211;</span> : "+"}
      </Button>
      {isOpen && children}
    </div>
  );
}
