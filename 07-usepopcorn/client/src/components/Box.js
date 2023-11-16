import { useState } from "react";
import Button from "./Button";

export default function Box({ element }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <Button onBtnClick={setIsOpen}>
        {isOpen ? <span>&#8211;</span> : "+"}
      </Button>
      {isOpen && element}
    </div>
  );
}
