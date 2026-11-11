import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

export default function Home({ movies, favorites, setFavorites, watchlist, setWatchlist }) {
  
  // 1. Memfilter data: Hanya ambil film yang ID-nya ada di dalam state
  const favoriteMovies = movies.filter(movie => favorites.includes(movie.id));
  const watchlistMovies = movies.filter(movie => watchlist.includes(movie.id));

  // 2. Mengambil nama genre unik dari data film untuk membuat tombol otomatis
  const genres = [...new Set(movies.flatMap(movie => movie.genre))];

  return (
    <div>
      <nav>
        <h1 style={{fontSize:'45px'}}>RINX PARKER CATALOG FILM</h1>
        <div className="container-nav">
          <Link className= 'link-nav' to="/">HOME</Link>
          <Link className= 'link-nav' to="/profile">PROFILE</Link>
          <Link className= 'link-nav' to="/edit-catalog">EDIT</Link>
        </div>
      </nav>
      <div style={{ padding: '0 20px', color: 'white' }}>
        
        {/* BAGIAN 1: Barisan Tombol Genre */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
            {genres.map(genre => (
              <Link className='tombol-genre'
                key={genre} 
                to={`/genre/${genre}`} 
              >
                {genre}
              </Link>
            ))}
          </div>
        </section>

        {/* BAGIAN 2: Katalog Utama (Semua Film) */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{fontSize:'40px'}}>Movie List</h2>
          <div 
          style={{ 
            display: 'flex', 
            gap: '20px', 
            flexWrap:'wrap', 
            paddingBottom: '15px',
            padding:'10px'
          }}>
            {movies.map((movie) => (
              <MovieCard 
                key={movie.id} movie={movie} 
                favorites={favorites} setFavorites={setFavorites} 
                watchlist={watchlist} setWatchlist={setWatchlist} 
              />
            ))}
          </div>
        </section>

        {/* BAGIAN 4: Barisan WATCH LATER (Sesuai Wireframe) */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{fontSize:'40px'}}>Watch Later</h2>
          <div style={{ 
                        display: 'flex', 
                        gap: '15px', 
                        overflowX: 'auto', 
                        paddingBottom: '15px',
                        padding : '10px'
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
              <p style={{ color: '#aaa', fontStyle: 'italic' }}>Daftar tonton nanti masih kosong.</p>
            )}
          </div>
        </section>

      </div>
    </div>
    
  );
}