import Button from "./Button";
import StarRating from "./StarRating";

export default function Detail({
  item,
  onCloseDetail,
  onSetRating,
  rating,
  onAddToList,
}) {
  const movieDate = new Date(item.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "short",
    // weekday: "long",
  });
  const data = {
    title: item.title,
    year: item.year,
    poster: item.poster,
    runtime: item.runtime,
    imdbRating: item.imdbRating,
    userRating: rating,
    movie: item._id,
  };
  return (
    <div className="detail">
      {/* <button className="btn btn--back" onClick={() => onSetItem(null)}>
        &#8592;
      </button> */}
      <Button type="back" onBtnClick={onCloseDetail}>
        &#8592;
      </Button>
      <div className="info-box">
        <img src={item.poster} alt={item.title} />
        <div className="info">
          <p className="heading">{item.title}</p>
          <p>
            {movieDate} • {item.runtime} min
          </p>
          <p>{item.categories.join(", ")}</p>
          <p>
            <span>⭐ </span>
            {item.imdbRating} IMDb rating
          </p>
        </div>
      </div>
      <div className="description-box">
        <div className="rating">
          <StarRating
            key={item._id}
            size={24}
            onSetRating={onSetRating}
            defaultRating={rating ? rating : 0}
          />
          {rating ? (
            <button className="btn--add" onClick={() => onAddToList(data)}>
              + Add to list
            </button>
          ) : null}
        </div>
        <div className="description">
          <p>{item.description}</p>
          <p>Starring {item.starring.join(", ")}</p>
          <p>Directed by {item.directed.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
