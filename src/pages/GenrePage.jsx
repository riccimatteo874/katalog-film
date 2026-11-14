import { useParams, Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

export default function GenrePage({ movies, favorites, setFavorites, watchlist, setWatchlist }) {
  // useParams captures the dynamic parameter from the URL (:genreName)
  const { genreName } = useParams();
  
  // Filter movies matching the genre
  const genreMovies = movies.filter(movie => movie.genre.includes(genreName));
  
  return (
    <div style={{ padding: '16px', color: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#aaa', textDecoration: 'none', fontSize: '1.2rem' }}>←</Link>
        <h2 style={{ margin: 0, marginTop: '10px' }}>
          Explore Genre: <span style={{ color: '#007bff' }}>{genreName}</span>
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '30px' }}>
        {genreMovies.length > 0 ? (
          genreMovies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              favorites={favorites} setFavorites={setFavorites} 
              watchlist={watchlist} setWatchlist={setWatchlist} 
            />
          ))
        ) : (
          <p style={{ color: '#aaa' }}>No movies found for this genre yet.</p>
        )}
      </div>

      <div>
        <Link className="tombol-kembali" to="/">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
