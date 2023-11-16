import { useState } from "react";
import Button from "./Button";
import List from "./List";

export default function Watched({ stats, data }) {
  const [isWatchedOpen, setIsWatchedOpen] = useState(true);

  return (
    <div className="box">
      <Button onBtnClick={setIsWatchedOpen}>
        {isWatchedOpen ? <span>&#8211;</span> : "+"}
      </Button>
      {isWatchedOpen && <List type="watched" data={data} stats={stats} />}
    </div>
  );
}
