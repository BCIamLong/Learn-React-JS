import { useState } from "react";
import Button from "./Button";
import List from "./List";

export default function ListBox({ data }) {
  const [isMoviesOpen, setIsMoviesOpen] = useState(true);
  return (
    <div className="box">
      <Button onBtnClick={setIsMoviesOpen}>
        {isMoviesOpen ? <span>&#8211;</span> : "+"}
      </Button>
      {isMoviesOpen && <List type="movies" data={data} />}
    </div>
  );
}
