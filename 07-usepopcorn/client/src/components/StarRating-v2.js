import { useState } from "react";
import "../startRating.css";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function StarRating({ numStars = 10 }) {
  const [stars, setStars] = useState(
    Array.from({ length: numStars }, (v, i) => i)
  );
  const [selectedStar, setSelectedStar] = useState(null);
  const [curStar, setCurStar] = useState(0);
  // const stars = Array.from({ length: 10 });

  function handleMouseEnter(index) {
    setCurStar(index + 1);
    setStars((stars) => {
      const newStars = stars.map((s, i) => {
        if (stars[index]?.fill) return i > index ? { fill: false } : s;

        if (!stars[index]?.fill) return i <= index ? { fill: true } : s;

        // if (selectedStar) return i > index ? { fill: false } : s;
        // if (selectedStar) return i <= index ? { fill: true } : s;
      });
      return newStars;
    });
  }

  function handleMouseLeave() {
    if (selectedStar) setCurStar(selectedStar + 1);
    if (selectedStar)
      return setStars((stars) =>
        stars.map((s, i) =>
          i <= selectedStar ? { fill: true } : { fill: false }
        )
      );
    setStars((stars) => stars.map((s) => ({ fill: false })));
    setCurStar(0);
  }
  return (
    <div className="stars">
      {/* <FaStar className="star" /> */}
      {stars.map((s, i) => (
        <Star
          key={i}
          full={s?.fill}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => handleMouseEnter(i)}
          onSelectedStar={() => setSelectedStar(i)}
        />
      ))}
      <span className="cur-rating">{curStar || ""}</span>
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
