import { useState } from "react";
import Button from "./Button";
// import List from "./List";

export default function ListBox({ children }) {
  const [isMoviesOpen, setIsMoviesOpen] = useState(true);
  return (
    <div className="box">
      <Button onBtnClick={setIsMoviesOpen}>
        {isMoviesOpen ? <span>&#8211;</span> : "+"}
      </Button>
      {isMoviesOpen && children}
    </div>
  );
}
