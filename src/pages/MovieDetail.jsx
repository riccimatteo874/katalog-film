import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function MovieDetail({
  movies = [],
  favorites = [],
  setFavorites,
  watchlist = [],
  setWatchlist,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find movie by ID
  const movie = movies.find((m) => String(m.id) === String(id));

  // State for emoji reaction per movie
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  // Emoji options with English labels
  const emojiList = [
    { emoji: "🤩", label: "Awesome!" },
    { emoji: "❤️", label: "Loved It!" },
    { emoji: "👏", label: "Masterpiece" },
    { emoji: "😂", label: "Fun & Funny" },
    { emoji: "😱", label: "Thrilling" },
    { emoji: "😢", label: "Touching" },
    { emoji: "😴", label: "Boring / Meh" },
  ];

  // Load saved emoji reaction from localStorage
  useEffect(() => {
    if (!id) return;
    try {
      const savedReactions = JSON.parse(
        localStorage.getItem("katalog_movie_reactions") || "{}"
      );
      if (savedReactions[id]) {
        setSelectedEmoji(savedReactions[id]);
      } else {
        setSelectedEmoji(null);
      }
    } catch {
      setSelectedEmoji(null);
    }
  }, [id]);

  // Handle select or deselect emoji
  const handleEmojiClick = (item) => {
    try {
      const savedReactions = JSON.parse(
        localStorage.getItem("katalog_movie_reactions") || "{}"
      );

      // If the same emoji is clicked, deselect it
      if (selectedEmoji && selectedEmoji.emoji === item.emoji) {
        delete savedReactions[id];
        localStorage.setItem(
          "katalog_movie_reactions",
          JSON.stringify(savedReactions)
        );
        setSelectedEmoji(null);
      } else {
        savedReactions[id] = item;
        localStorage.setItem(
          "katalog_movie_reactions",
          JSON.stringify(savedReactions)
        );
        setSelectedEmoji(item);
      }
    } catch (e) {
      console.error("Failed to save emoji reaction:", e);
    }
  };

  if (!movie) {
    return (
      <div style={{ padding: "40px 20px", color: "white", textAlign: "center" }}>
        <h2>Movie Not Found</h2>
        <p style={{ color: "#aaa", marginBottom: "20px" }}>
          The movie you are looking for might have been deleted or is unavailable.
        </p>
        <Link to="/" className="tombol-kembali">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(movie.id);
  const isWatchlisted = watchlist.includes(movie.id);

  const toggleFavorite = () => {
    if (!setFavorites) return;
    isFavorite
      ? setFavorites(favorites.filter((favId) => favId !== movie.id))
      : setFavorites([...favorites, movie.id]);
  };

  const toggleWatchlist = () => {
    if (!setWatchlist) return;
    isWatchlisted
      ? setWatchlist(watchlist.filter((wId) => wId !== movie.id))
      : setWatchlist([...watchlist, movie.id]);
  };

  // Fallback values
  const releaseDate = movie.releaseDate || "Unknown";
  const duration = movie.duration || "120 Minutes";
  const producer = movie.producer || "Movie Catalog Studio";
  const rating = movie.rating || "8.0 / 10";
  const synopsis =
    movie.synopsis ||
    "No synopsis available for this movie yet. This movie is part of our quality catalog collection.";
  const genres = Array.isArray(movie.genre)
    ? movie.genre
    : [movie.genre || "General"];

  return (
    <div className="movie-detail-container">
      {/* Back Button & Navigation */}
      <div className="movie-detail-nav">
        <button
          onClick={() => navigate(-1)}
          className="tombol-kembali"
          style={{ border: "none", cursor: "pointer" }}
        >
          ← Back
        </button>
        <Link to="/" className="link-nav" style={{ fontSize: "16px" }}>
          Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="movie-detail-content">
        {/* Left Column: Poster & Action Buttons */}
        <div className="movie-detail-poster-col">
          <div className="movie-detail-poster-wrapper">
            <img
              src={movie.image}
              alt={movie.title}
              className="movie-detail-poster"
            />
            <div className="movie-detail-rating-badge">⭐ {rating}</div>
          </div>

          {/* Favorite & Watchlist Buttons */}
          <div className="movie-detail-actions">
            <button
              onClick={toggleFavorite}
              className={`btn-icon ${isFavorite ? "active-fav" : ""}`}
              style={{
                width: "auto",
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontSize: "1rem",
              }}
            >
              <span>{isFavorite ? "♥" : "♡"}</span>
              <span>{isFavorite ? "Favorited" : "Add to Favorites"}</span>
            </button>

            <button
              onClick={toggleWatchlist}
              className={`btn-action ${isWatchlisted ? "active-watch" : ""}`}
              style={{
                borderRadius: "8px",
                padding: "10px",
                fontSize: "0.95rem",
              }}
            >
              {isWatchlisted ? "✓ On Watchlist" : "+ Watch Later"}
            </button>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="movie-detail-info-col">
          <h1 className="movie-detail-title">{movie.title}</h1>

          {/* Genre Pills */}
          <div className="movie-detail-genres">
            {genres.map((g) => (
              <Link key={g} to={`/genre/${g}`} className="tombol-genre">
                {g}
              </Link>
            ))}
          </div>

          {/* Metadata Grid */}
          <div className="movie-detail-meta-grid">
            <div className="movie-meta-item">
              <span className="movie-meta-label">📅 Release Date</span>
              <span className="movie-meta-value">{releaseDate}</span>
            </div>

            <div className="movie-meta-item">
              <span className="movie-meta-label">⏱️ Duration</span>
              <span className="movie-meta-value">{duration}</span>
            </div>

            <div className="movie-meta-item">
              <span className="movie-meta-label">🎬 Producer</span>
              <span className="movie-meta-value">{producer}</span>
            </div>

            <div className="movie-meta-item">
              <span className="movie-meta-label">⭐ User Rating</span>
              <span className="movie-meta-value">{rating}</span>
            </div>
          </div>

          {/* Synopsis Section */}
          <div className="movie-detail-synopsis-section">
            <h3 className="section-title">📖 Synopsis</h3>
            <p className="movie-detail-synopsis-text">{synopsis}</p>
          </div>

          {/* Emoji Reaction Section */}
          <div className="movie-detail-emoji-section">
            <h3 className="section-title">✨ How Did You Feel About This Movie?</h3>
            <p className="emoji-subtitle">
              Select an emoji below to express your reaction or impression!
            </p>

            <div className="emoji-picker-grid">
              {emojiList.map((item) => {
                const isActive = selectedEmoji?.emoji === item.emoji;
                return (
                  <button
                    key={item.emoji}
                    onClick={() => handleEmojiClick(item)}
                    className={`emoji-button ${isActive ? "active-emoji" : ""}`}
                    title={item.label}
                  >
                    <span className="emoji-icon">{item.emoji}</span>
                    <span className="emoji-label">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Reaction Banner */}
            {selectedEmoji && (
              <div className="selected-emoji-banner">
                <span>Your Reaction Saved:</span>
                <strong>
                  {selectedEmoji.emoji} {selectedEmoji.label}
                </strong>
                <button
                  onClick={() => handleEmojiClick(selectedEmoji)}
                  className="btn-clear-emoji"
                  title="Remove reaction"
                >
                  ✕ Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
