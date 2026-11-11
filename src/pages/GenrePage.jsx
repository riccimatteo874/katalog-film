import { useParams, Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

export default function GenrePage({ movies, favorites, setFavorites, watchlist, setWatchlist }) {
  // useParams menangkap parameter dinamis dari URL (bagian :genreName)
  const { genreName } = useParams();
  
  // Menyaring data film murni berdasarkan genre yang ada di URL
  const genreMovies = movies.filter(movie => movie.genre.includes(genreName));
  return (
    <div style={{ padding: '0 20px', color: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#aaa', textDecoration: 'none', fontSize: '1.2rem' }}>←</Link>
        <h2 style={{ margin: 0 }}>Jelajah Genre: <span style={{ color: '#007bff' }}>{genreName}</span></h2>
      </div>

      {/* Menggunakan flexWrap agar kartu turun ke baris baru jika layarnya penuh (Sistem Grid) */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom:'30px'}}>
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
          <p style={{ color: '#aaa' }}>Belum ada film untuk genre ini.</p>
        )}
      </div>
      <div >
        <Link className= 'tombol-kembali' to="/" >
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}