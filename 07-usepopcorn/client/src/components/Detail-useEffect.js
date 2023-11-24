import { useEffect, useState } from "react";
import Button from "./Button";
import StarRating from "./StarRating";
import { getMovieDetail } from "../api/movie";
import { getWatchedDetail } from "../api/watched";
import Loader from "./Loader";

export default function Detail({
  selectedId,
  onCloseDetail,
  onSetRating,
  rating,
  onAddToList,
  setMovieRating,
}) {
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const movieDate = new Date(movieDetail?.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      day: "numeric",
      month: "short",
      // weekday: "long",
    }
  );
  const data = {
    title: movieDetail.title,
    year: movieDetail.year,
    poster: movieDetail.poster,
    runtime: movieDetail.runtime,
    imdbRating: movieDetail.imdbRating,
    userRating: rating,
    movie: movieDetail._id,
  };
  // console.log(data);
  useEffect(() => {
    async function getMovie() {
      setIsLoading(true);
      // if (!selectedId) return;
      const movie = await getMovieDetail(selectedId);
      const watchedCheck = await getWatchedDetail(selectedId);
      setMovieRating(watchedCheck ? watchedCheck.userRating : 0);

      setMovieDetail(movie);
      setIsLoading(false);
    }
    getMovie();
  }, [selectedId, setMovieRating]);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="detail">
      {/* <button className="btn btn--back" onClick={() => onSetItem(null)}>
        &#8592;
      </button> */}
      <Button type="back" onBtnClick={onCloseDetail}>
        &#8592;
      </Button>
      <div className="info-box">
        <img src={movieDetail.poster} alt={`Poster of ${movieDetail.title}`} />
        <div className="info">
          <p className="heading">{movieDetail.title}</p>
          <p>
            {movieDate} • {movieDetail.runtime} min
          </p>
          <p>{movieDetail.categories?.join(", ")}</p>
          <p>
            <span>⭐ </span>
            {movieDetail.imdbRating} IMDb rating
          </p>
        </div>
      </div>
      <div className="description-box">
        <div className="rating">
          <StarRating
            key={movieDetail._id}
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
          <p>{movieDetail.description}</p>
          <p>Starring {movieDetail.starring?.join(", ")}</p>
          <p>Directed by {movieDetail.directed?.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
