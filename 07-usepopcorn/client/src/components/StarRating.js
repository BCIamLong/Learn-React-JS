import { useState } from "react";
import PropTypes from "prop-types";
import "../startRating.css";
import { FaRegStar, FaStar } from "react-icons/fa";

StarRating.propTypes = {
  // numStars: PropTypes.number.isRequired,
  numStars: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  message: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  numStars = 10,
  color = "#ffd43b",
  size = 12,
  className = "",
  message = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [selectedStar, setSelectedStar] = useState(defaultRating);
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
    <div className={`stars ${className}`}>
      {Array.from({ length: numStars }, (v, i) => (
        <Star
          color={color}
          size={size}
          key={i}
          full={(curStar || selectedStar) >= i + 1}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => handleMouseEnter(i)}
          onSelectedStar={() => {
            setSelectedStar(i + 1);
            onSetRating(i + 1);
          }}
        />
      ))}

      <span
        className="cur-rating"
        style={{ color, fontSize: `${size / 10}rem` }}
      >
        {message.length && message.length === numStars
          ? message[(curStar || selectedStar) - 1]
          : curStar || selectedStar || ""}
      </span>
    </div>
  );
}

// const customStarStyle = {};

function Star({
  full,
  onMouseEnter,
  onMouseLeave,
  onSelectedStar,
  color,
  size,
}) {
  return (
    <span
      style={{ color: color, fontSize: `${size / 10}rem` }}
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
