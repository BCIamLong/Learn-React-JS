export default function Stats({ stats }) {
  return (
    <li className="item stats">
      <div className="item-info">
        <p className="name">Movies you watched</p>
        <div className="review">
          <p>{stats?.count ? stats.count : 0} movies</p>
          <p>⭐ {Math.round(stats?.avgImdbRating ? stats.avgImdbRating : 0)}</p>
          <p>🌟 {Math.round(stats?.avgUserRating ? stats.avgUserRating : 0)}</p>
          <p>⏳ {Math.round(stats?.avgRuntime ? stats.avgRuntime : 0)} min</p>
        </div>
      </div>
    </li>
  );
}
