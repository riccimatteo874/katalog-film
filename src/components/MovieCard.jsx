import "../App.css"; // Pastikan CSS terhubung

export default function MovieCard({
  movie,
  favorites = [],
  setFavorites,
  watchlist = [],
  setWatchlist,
}) {
  const isFavorite = favorites.includes(movie.id);
  const isWatchlisted = watchlist.includes(movie.id);

  const toggleFavorite = () => {
    isFavorite
      ? setFavorites(favorites.filter((id) => id !== movie.id))
      : setFavorites([...favorites, movie.id]);
  };

  const toggleWatchlist = () => {
    isWatchlisted
      ? setWatchlist(watchlist.filter((id) => id !== movie.id))
      : setWatchlist([...watchlist, movie.id]);
  };

  return (
    <div className="movie-card">
      <div className="card-image-wrapper">
        {/* Render gambar menggunakan properti image dari data */}
        <img src={movie.image} alt={movie.title} className="movie-image" />
        <div className="genre-tag">{movie.genre.join(", ")}</div>
      </div>

      <div className="card-content">
        <h3 className="movie-title" title={movie.title}>
          {movie.title}
        </h3>

        <div className="card-actions">
          <button
            onClick={toggleFavorite}
            className={`btn-icon ${isFavorite ? "active-fav" : ""}`}
            title="Jadikan Favorit"
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
