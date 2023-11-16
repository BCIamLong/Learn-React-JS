export default function Stats({ stats }) {
  return (
    <li className="item stats">
      <div className="item-info">
        <p className="name">Movies you watched</p>
        <div className="review">
          <p>{stats?.count} movies</p>
          <p>⭐ {stats?.avgImdbRating}</p>
          <p>🌟 {stats?.avgUserRating}</p>
          <p>⏳ {stats?.avgRuntime} min</p>
        </div>
      </div>
    </li>
  );
}
