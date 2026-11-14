import { useNavigate } from "react-router-dom";
import "../App.css";

export default function MovieCard({
  movie,
  favorites = [],
  setFavorites,
  watchlist = [],
  setWatchlist,
}) {
  const navigate = useNavigate();
  const isFavorite = favorites.includes(movie.id);
  const isWatchlisted = watchlist.includes(movie.id);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    isFavorite
      ? setFavorites(favorites.filter((id) => id !== movie.id))
      : setFavorites([...favorites, movie.id]);
  };

  const toggleWatchlist = (e) => {
    e.stopPropagation();
    isWatchlisted
      ? setWatchlist(watchlist.filter((id) => id !== movie.id))
      : setWatchlist([...watchlist, movie.id]);
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div className="card-image-wrapper">
        <img src={movie.image} alt={movie.title} className="movie-image" />
        <div className="genre-tag">
          {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}
        </div>
      </div>

      <div className="card-content">
        <h3 className="movie-title" title={movie.title}>
          {movie.title}
        </h3>

        <div className="card-actions">
          <button
            onClick={toggleFavorite}
            className={`btn-icon ${isFavorite ? "active-fav" : ""}`}
            title="Add to Favorites"
          >
            {isFavorite ? "♥" : "♡"}
          </button>

          <button
            onClick={toggleWatchlist}
            className={`btn-action ${isWatchlisted ? "active-watch" : ""}`}
          >
            {isWatchlisted ? "✓ Saved" : "+ Watch Later"}
          </button>
        </div>
      </div>
    </div>
  );
}
