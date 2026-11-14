import { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

export default function Home({ movies, favorites, setFavorites, watchlist, setWatchlist }) {
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Filter movies based on search query
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // 2. Filter favorites & watchlist
  const favoriteMovies = movies.filter(movie => favorites.includes(movie.id));
  const watchlistMovies = movies.filter(movie => watchlist.includes(movie.id));

  // 3. Get unique genres for buttons
  const genres = [...new Set(movies.flatMap(movie => movie.genre))];

  return (
    <div>
      <nav>
        <h1 style={{ fontSize: '45px' }}>RINX PARKER MOVIE CATALOG</h1>
        <div className="container-nav">
          <Link className="link-nav" to="/">HOME</Link>
          <Link className="link-nav" to="/profile">PROFILE</Link>
          <Link className="link-nav" to="/edit-catalog">EDIT</Link>
        </div>
        {/* Search Bar */}
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search movies by title or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
      </nav>
      <div style={{ padding: '0 16px', color: 'white' }}>
        
        {/* SECTION 1: Genre Buttons */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
            {genres.map(genre => (
              <Link className="tombol-genre"
                key={genre} 
                to={`/genre/${genre}`} 
              >
                {genre}
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 2: Main Catalog (All Movies) */}
        <section style={{ marginBottom: '40px'}}>
          <h2 style={{ fontSize: '40px' }}>Movie List</h2>
          {/* Search result notification */}
          {searchQuery && (
            <p className="search-result-info">
              {filteredMovies.length > 0
                ? `Showing ${filteredMovies.length} results for "${searchQuery}"`
                : `No movies matched "${searchQuery}"`}
            </p>
          )}

          <div 
          style={{ 
            display: 'flex', 
            gap: '16px', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            paddingBottom: '15px',
            padding: '10px',
          }}>
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieCard 
                  key={movie.id} movie={movie} 
                  favorites={favorites} setFavorites={setFavorites} 
                  watchlist={watchlist} setWatchlist={setWatchlist} 
                />
              ))
            ) : (
              <p style={{ color: '#aaa', fontStyle: 'italic' }}>
                No movies found. Try another keyword.
              </p>
            )}
          </div>
        </section>

        {/* SECTION 3: Watch Later */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '40px' }}>Watch Later</h2>
          <div style={{ 
                        display: 'flex', 
                        gap: '15px', 
                        overflowX: 'auto', 
                        paddingBottom: '15px',
                        padding: '10px'
                      }}>
            {watchlistMovies.length > 0 ? (
              watchlistMovies.map((movie) => (
                <MovieCard 
                  key={movie.id} movie={movie} 
                  favorites={favorites} setFavorites={setFavorites} 
                  watchlist={watchlist} setWatchlist={setWatchlist} 
                />
              ))
            ) : (
              <p style={{ color: '#aaa', fontStyle: 'italic' }}>Your watch later list is currently empty.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
