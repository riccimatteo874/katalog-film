import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import GenrePage from "./pages/GenrePage";
import Profile from "./pages/Profile";
import EditCatalog from "./pages/EditCatalog.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import NotFound from "./pages/NotFound";
import { moviesData as initialMovies } from "./assets/data.js";
import "./App.css";

export default function App() {
  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem("katalog_profile");
    return savedProfile ? JSON.parse(savedProfile) : { name: "User", bio: "" };
  });

  useEffect(() => {
    localStorage.setItem("katalog_profile", JSON.stringify(userProfile));
  }, [userProfile]);

  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("katalog_movies");
    if (!savedMovies) return initialMovies;
    try {
      const parsed = JSON.parse(savedMovies);
      // Synchronize with initialMovies so translated display data appears cleanly
      return parsed.map((m) => {
        const found = initialMovies.find((item) => item.id === m.id);
        return found
          ? {
              ...m,
              releaseDate: found.releaseDate,
              duration: found.duration,
              producer: found.producer,
              rating: found.rating,
              synopsis: found.synopsis,
              genre: found.genre,
            }
          : m;
      });
    } catch {
      return initialMovies;
    }
  });

  const [watchlist, setWatchlist] = useState(() => {
    const savedWatch = localStorage.getItem("katalog_watchlist");
    return savedWatch ? JSON.parse(savedWatch) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem("katalog_favorites");
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem("katalog_movies", JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem("katalog_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("katalog_favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              movies={movies}
              favorites={favorites}
              setFavorites={setFavorites}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetail
              movies={movies}
              favorites={favorites}
              setFavorites={setFavorites}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />
          }
        />
        <Route
          path="/genre/:genreName"
          element={
            <GenrePage
              movies={movies}
              favorites={favorites}
              setFavorites={setFavorites}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              movies={movies}
              favorites={favorites}
              setFavorites={setFavorites}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
              userProfile={userProfile}
              setUserProfile={setUserProfile}
            />
          }
        />
        <Route
          path="/edit-catalog"
          element={<EditCatalog movies={movies} setMovies={setMovies} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
