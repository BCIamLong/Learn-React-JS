export default function Item({ type, item }) {
  return (
    <li className="item">
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
          </div>
        )}
      </div>
    </li>
  );
}
