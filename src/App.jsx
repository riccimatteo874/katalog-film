import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import GenrePage from './pages/GenrePage';
import Profile from './pages/Profile';
import EditCatalog from './pages/EditCatalog.jsx'
import NotFound from './pages/NotFound';
import { moviesData as initialMovies } from "./assets/data.js";
import './App.css';


export default function App() {
  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem('katalog_profile');
    return savedProfile ? JSON.parse(savedProfile) : { name: 'User', bio: '' };
  });

  useEffect(() => {
    localStorage.setItem('katalog_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('katalog_movies');
    return savedMovies ? JSON.parse(savedMovies) : initialMovies;
  });

  const [watchlist, setWatchlist] = useState(() => {
    const savedWatch = localStorage.getItem('katalog_watchlist');
    return savedWatch ? JSON.parse(savedWatch) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('katalog_favorites');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem('katalog_movies', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem('katalog_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('katalog_favorites', JSON.stringify(favorites));
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
          path="/genre/:genreName" 
          element={
            <GenrePage 
              movies={movies} 
              favorites={favorites} setFavorites={setFavorites}
              watchlist={watchlist} setWatchlist={setWatchlist}
            />
          } 
        />
        <Route 
          path="/profile" 
          element={
            <Profile 
              movies={movies} 
              favorites={favorites} setFavorites={setFavorites}
              watchlist={watchlist} setWatchlist={setWatchlist}
              userProfile={userProfile} setUserProfile={setUserProfile}
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
