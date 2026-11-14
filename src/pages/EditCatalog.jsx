import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function EditCatalog({ movies, setMovies }) {
  const [title, setTitle] = useState('');
  const [genreInput, setGenreInput] = useState('');
  const [image, setImage] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [duration, setDuration] = useState('');
  const [producer, setProducer] = useState('');
  const [rating, setRating] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();

  // Filter movies based on search query
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // --- ADD MOVIE FUNCTION ---
  const handleAdd = (e) => {
    e.preventDefault();
    const genresArray = genreInput.split(',').map(g => g.trim());
    const newMovie = {
      // Find highest ID, then add 1
      id: movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1,
      title: title,
      genre: genresArray,
      image: image || "https://placehold.co/400x600/1a1a24/3b82f6?text=No+Image",
      releaseDate: releaseDate || "2026",
      duration: duration || "120 Minutes",
      producer: producer || "Movie Catalog Studio",
      rating: rating || "8.0 / 10",
      synopsis: synopsis || "No synopsis available for this movie yet.",
    };

    setMovies([...movies, newMovie]);
    
    // Clear form after success
    setTitle('');
    setGenreInput('');
    setImage('');
    setReleaseDate('');
    setDuration('');
    setProducer('');
    setRating('');
    setSynopsis('');
    alert("Movie added successfully!");
  };

  // --- DELETE MOVIE FUNCTION ---
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this movie from the catalog?");
    
    if (isConfirmed) {
      const updatedMovies = movies.filter(movie => movie.id !== id);
      setMovies(updatedMovies);
    }
  };

  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '45px' }}>RINX PARKER MOVIE CATALOG</h1>
        <div className="container-nav">
          <Link className="link-nav" to="/">HOME</Link>
          <Link className="link-nav" to="/profile">PROFILE</Link>
          <Link className="link-nav" to="/edit-catalog">EDIT</Link>
        </div>
      </nav>

      <div style={{ padding: '30px 16px', color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
        {/* SECTION 1: ADD NEW MOVIE FORM + BACK BUTTON */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '16px', width: '100%', flexWrap: 'wrap' }}>
          <section style={{ marginBottom: '50px', background: 'rgba(26, 26, 36, 0.5)', padding: '24px', borderRadius: '12px', border: '1px solid #333', maxWidth: '500px', width: '100%', boxSizing: 'border-box' }}>
            <h2 style={{ marginTop: 0 }}>+ Add New Movie</h2>
            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#ffffff', fontWeight: 'bold' }}>Movie Title: *</label>
                <input 
                  type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                  style={{ width: '100%', padding: '10px', background: '#0d0d12', border: '1px solid #444', color: 'white', borderRadius: '5px', boxSizing: 'border-box' }}
                  placeholder="Enter movie title"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#ffffff', fontWeight: 'bold' }}>Genre: *</label>
                <input 
                  type="text" value={genreInput} onChange={(e) => setGenreInput(e.target.value)} required
                  style={{ width: '100%', padding: '10px', background: '#0d0d12', border: '1px solid #444', color: 'white', borderRadius: '5px', boxSizing: 'border-box' }}
                  placeholder="e.g. Action, Sci-Fi, Adventure"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#ffffff', fontWeight: 'bold' }}>Poster URL:</label>
                <input 
                  type="text" value={image} onChange={(e) => setImage(e.target.value)} 
                  style={{ width: '100%', padding: '10px', background: '#0d0d12', border: '1px solid #444', color: 'white', borderRadius: '5px', boxSizing: 'border-box' }}
                  placeholder="Enter poster image URL"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: '#aaa' }}>Release Date:</label>
                  <input 
                    type="text" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)}
                    style={{ width: '100%', padding: '8px', background: '#0d0d12', border: '1px solid #444', color: 'white', borderRadius: '5px', boxSizing: 'border-box' }}
                    placeholder="e.g. May 12, 2024"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: '#aaa' }}>Duration:</label>
                  <input 
                    type="text" value={duration} onChange={(e) => setDuration(e.target.value)}
                    style={{ width: '100%', padding: '8px', background: '#0d0d12', border: '1px solid #444', color: 'white', borderRadius: '5px', boxSizing: 'border-box' }}
                    placeholder="e.g. 2h 15m"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: '#aaa' }}>Producer:</label>
                  <input 
                    type="text" value={producer} onChange={(e) => setProducer(e.target.value)}
                    style={{ width: '100%', padding: '8px', background: '#0d0d12', border: '1px solid #444', color: 'white', borderRadius: '5px', boxSizing: 'border-box' }}
                    placeholder="e.g. Kevin Feige"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: '#aaa' }}>Rating:</label>
                  <input 
                    type="text" value={rating} onChange={(e) => setRating(e.target.value)}
                    style={{ width: '100%', padding: '8px', background: '#0d0d12', border: '1px solid #444', color: 'white', borderRadius: '5px', boxSizing: 'border-box' }}
                    placeholder="e.g. 8.5 / 10"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: '#aaa' }}>Synopsis:</label>
                <textarea 
                  value={synopsis} onChange={(e) => setSynopsis(e.target.value)}
                  rows="3"
                  style={{ width: '100%', padding: '8px', background: '#0d0d12', border: '1px solid #444', color: 'white', borderRadius: '5px', boxSizing: 'border-box', resize: 'vertical' }}
                  placeholder="Write a brief synopsis of the movie..."
                />
              </div>

              <button type="submit" className="button-add" style={{ marginTop: '6px' }}>
                Save Movie
              </button>
            </form>
          </section>


        </div>

        {/* SECTION 2: MOVIE LIST & DELETE BUTTON */}
        <section style={{ width: '100%' }}>
          <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '16px' }}>
            Manage Catalog ({movies.length} Movies)
          </h2>

          {/* Search Bar */}
          <div className="search-wrapper" style={{ maxWidth: '400px', marginBottom: '16px' }}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search movies in catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>

          {/* Search result info */}
          {searchQuery && (
            <p className="search-result-info">
              {filteredMovies.length > 0
                ? `${filteredMovies.length} of ${movies.length} movies found`
                : `No movies matched "${searchQuery}"`}
            </p>
          )}
          
          <div className="edit-catalog-grid">
            {filteredMovies.length > 0 ? (
              filteredMovies.map(movie => (
                <div key={movie.id} style={{ 
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  background: '#1a1a24', padding: '12px 15px', borderRadius: '8px', 
                  border: '1px solid #333', gap: '10px'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1rem', lineHeight: '1.3' }}>{movie.title}</span>
                    <span style={{ fontSize: '0.78rem', color: '#aaa' }}>{Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}</span>
                  </div>
                  
                  <button className="button-delete"
                    onClick={() => handleDelete(movie.id)} 
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p style={{ color: '#aaa', fontStyle: 'italic', textAlign: 'center', gridColumn: '1 / -1' }}>
                {movies.length === 0 ? 'Catalog is empty.' : 'No movies matched.'}
              </p>
            )}
          </div>
        </section>
        <div style={{ paddingTop: '8px' }}>
          <Link className="tombol-kembali" to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
