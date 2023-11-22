import { useState } from "react";

export default function TabContent({ item }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [likes, setLikes] = useState(0);

  console.log("RENDER");

  function handleSetLikes(num) {
    setLikes(likes + num);
  }

  function handleTripleLikes() {
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
    // console.log(likes);
  }

  function handleUndo(time) {
    setTimeout(() => {
      setIsDetailsOpen(true);
      setLikes(0);
      console.log(likes);
    }, time * 1000);
  }

  function handleUndo2s() {
    setTimeout(() => {
      setIsDetailsOpen(true);
      setLikes(0);
    }, 2000);
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
          <button className="btn" onClick={handleTripleLikes}>
            +++
          </button>
        </div>
      </div>
      <div className="options">
        <button className="btn" onClick={() => handleUndo(0)}>
          Undo
        </button>
        <button className="btn" onClick={() => handleUndo(2)}>
          Undo in 2s
        </button>
      </div>
    </div>
  );
}
