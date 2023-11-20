import { useState } from "react";

export default function TabContent({ item }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleSetLikes(num) {
    setLikes(likes + num);
  }
  return (
    <div className="description">
      <p className="title">{item.summary}</p>
      {/* <p className={`text ${isDetailsOpen ? "" : "hide"}`}>{item.details}</p> */}
      {isDetailsOpen && <p className="text">{item.details}</p>}
      <div className="details">
        <button
          className="btn btn--detail"
          onClick={() => setIsDetailsOpen((is) => !is)}
        >
          {isDetailsOpen ? "Hide details" : "Show details"}
        </button>
        <div className="likes">
          <p>
            {likes} <span>❤</span>
          </p>
          <button className="btn" onClick={() => handleSetLikes(1)}>
            +
          </button>
          <button className="btn" onClick={() => handleSetLikes(3)}>
            +++
          </button>
        </div>
      </div>
      <div className="options">
        <button className="btn">Undo</button>
        <button className="btn">Undo in 2s</button>
      </div>
    </div>
  );
}
