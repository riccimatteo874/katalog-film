import { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

export default function Profile({ movies, favorites, setFavorites, watchlist, setWatchlist, userProfile, setUserProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputName, setInputName] = useState(userProfile.name);
  const [inputBio, setInputBio] = useState(userProfile.bio);
  const favoriteMovies = movies.filter(movie => favorites.includes(movie.id));

  // Save profile changes
  const handleSave = (e) => {
    e.preventDefault(); 
    setUserProfile({ name: inputName, bio: inputBio }); 
    setIsEditing(false); 
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
      <div style={{ padding: '0 20px', color: 'white', maxWidth: '1000px', margin: '0 auto' }}>
        {/* USER PROFILE CARD */}
        <section style={{ 
          background: '#1a1a24', padding: '30px', borderRadius: '12px', 
          border: '1px solid #333', marginTop: '20px', marginBottom: '40px' 
        }}>
          {isEditing ? (
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Edit Profile</h3>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Nickname / Name:</label>
                <input 
                  type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} required
                  style={{ width: '100%', padding: '10px', background: '#0d0d12', border: '1px solid #444', color: 'white', borderRadius: '5px', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Short Bio:</label>
                <textarea 
                  value={inputBio} onChange={(e) => setInputBio(e.target.value)} required
                  rows="3"
                  style={{ width: '100%', padding: '10px', background: '#0d0d12', border: '1px solid #444', color: 'white', borderRadius: '5px', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ padding: '8px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Save
                </button>
                <button type="button" onClick={() => setIsEditing(false)} style={{ padding: '8px 20px', background: '#444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ fontSize: '2rem', margin: '0 0 10px 0' }}>
                    <span style={{ color: '#007bff' }}>{userProfile.name}</span>
                  </h2>
                  <p style={{ color: '#aaa', fontSize: '1.1rem', margin: '0 0 20px 0' }}>
                    {userProfile.bio}
                  </p>
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ✏️ Edit Profile
                </button>
              </div>
            </div>
          )}
        </section>

        {/* FAVORITES COLLECTION */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
            ♥ Favorite Movies Collection
          </h3>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {favoriteMovies.length > 0 ? (
              favoriteMovies.map((movie) => (
                <MovieCard 
                  key={movie.id} movie={movie} 
                  favorites={favorites} setFavorites={setFavorites} 
                  watchlist={watchlist} setWatchlist={setWatchlist} 
                />
              ))
            ) : (
              <p style={{ color: '#aaa', fontStyle: 'italic' }}>
                No favorite movies yet. Explore the home page to add movies!
              </p>
            )}
          </div>
        </section>
        
        <div style={{ marginBottom: '40px' }}>
          <Link to="/" className="tombol-kembali">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
