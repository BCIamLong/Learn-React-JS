import { useState } from "react";
import "../startRating.css";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function StarRating({ numStars = 10 }) {
  const [selectedStar, setSelectedStar] = useState(null);
  const [curStar, setCurStar] = useState(0);
  // const stars = Array.from({ length: 10 });

  function handleMouseEnter(index) {
    setCurStar(index + 1);
  }

  function handleMouseLeave() {
    if (selectedStar) setCurStar(selectedStar + 1);
    setCurStar(null);
  }
  return (
    <div className="stars">
      {Array.from({ length: numStars }, (v, i) => (
        <Star
          key={i}
          full={(curStar || selectedStar) >= i + 1}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => handleMouseEnter(i)}
          onSelectedStar={() => setSelectedStar(i + 1)}
        />
      ))}

      <span className="cur-rating">{curStar || selectedStar || ""}</span>
    </div>
  );
}

function Star({ full, onMouseEnter, onMouseLeave, onSelectedStar }) {
  return (
    <span
      role="button"
      className="star"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onSelectedStar}
    >
      {full ? <FaStar /> : <FaRegStar />}
    </span>
  );
}
