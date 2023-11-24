export default function Item({ type, item, onItemClick, onRemoveItem }) {
  return (
    <>
      {type === "movies" ? (
        <li className="item" onClick={() => onItemClick(item._id)}>
          {/* {type === 'movies' && <li className="item" onClick={() => onItemClick(item._id)}>} */}
          <img className="image" src={item.poster} alt={item.title} />
          <div className="item-info">
            <p className="name">{item.title}</p>
            {type === "movies" ? (
              <p className="year">📅 {item.year}</p>
            ) : (
              <div className="review">
                <p>⭐ {item.imdbRating}</p>
                <p>🌟 {item.userRating}</p>
                <p>⏳ {item.runtime} min</p>
                <button
                  className="btn btn--close"
                  onClick={() => onRemoveItem(item._id)}
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        </li>
      ) : (
        <li className="item">
          {/* {type === 'movies' && <li className="item" onClick={() => onItemClick(item._id)}>} */}
          <img className="image" src={item.poster} alt={item.title} />
          <div className="item-info">
            <p className="name">{item.title}</p>
            {type === "movies" ? (
              <p className="year">📅 {item.year}</p>
            ) : (
              <div className="review">
                <p>⭐ {item.imdbRating}</p>
                <p>🌟 {item.userRating}</p>
                <p>⏳ {item.runtime} min</p>
                <button
                  className="btn btn--close"
                  onClick={() => onRemoveItem(item._id)}
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        </li>
      )}
    </>
  );
}
