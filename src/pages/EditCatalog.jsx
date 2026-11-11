import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function EditCatalog({ movies, setMovies }) {
  const [title, setTitle] = useState('');
  const [genreInput, setGenreInput] = useState('');
  const [image, setImage] = useState('');
  
  const navigate = useNavigate();

  // --- FUNGSI TAMBAH FILM ---
  const handleAdd = (e) => {
    e.preventDefault();
    const genresArray = genreInput.split(',').map(g => g.trim());
    const newMovie = {
      // Mencari ID tertinggi saat ini, lalu ditambah 1 agar tidak bentrok
      id: movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1,
      title: title,
      genre: genresArray,
      image: image || "https://placehold.co/400x600/1a1a24/3b82f6?text=No+Image"
    };

    setMovies([...movies, newMovie]);
    
    // Mengosongkan form setelah berhasil ditambah (opsional jika tidak ingin langsung pindah halaman)
    setTitle('');
    setGenreInput('');
    setImage('');
    alert("Film berhasil ditambahkan!");
  };

  // --- FUNGSI HAPUS FILM ---
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Apakah kamu yakin ingin menghapus film ini dari katalog?");
    
    if (isConfirmed) {
      const updatedMovies = movies.filter(movie => movie.id !== id);
      setMovies(updatedMovies);
    }
  };

  return (
    <div style={{ padding: '40px 20px', color: 'white', maxWidth: '600px', margin: '0 auto' }}>
      
      {/* BAGIAN 1: FORM TAMBAH FILM */}
      <section style={{ marginBottom: '50px', background: 'rgba(26, 26, 36, 0.5)', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
        <h2>+ Tambah Film Baru</h2>
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ffffff', fontWeight:'bold' }}>Judul Film:</label>
            <input 
              type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
              style={{ width: '100%', padding: '10px', background: '#0d0d12', border: '1px solid #444', color: 'white', borderRadius: '5px', boxSizing: 'border-box' }}
              placeholder="Masukkan judul Movie"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ffffff', fontWeight:'bold' }}>Genre:</label>
            <input 
              type="text" value={genreInput} onChange={(e) => setGenreInput(e.target.value)} required
              style={{ width: '100%', padding: '10px', background: '#0d0d12', border: '1px solid #444', color: 'white', borderRadius: '5px', boxSizing: 'border-box' }}
              placeholder="Contoh: Action, Sci-Fi, Adventure"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ffffff', fontWeight:'bold' }}>URL Poster:</label>
            <input 
              type="text" value={image} onChange={(e) => setImage(e.target.value)} 
              style={{ width: '100%', padding: '10px', background: '#0d0d12', border: '1px solid #444', color: 'white', borderRadius: '5px', boxSizing: 'border-box' }}
              placeholder="Masukkan link gambar"
            />
          </div>

          <button type="submit" className='button-add'>
            Simpan Film
          </button>
        </form>
      </section>

      {/* BAGIAN 2: DAFTAR FILM & TOMBOL HAPUS */}
      <section>
        <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
          Kelola Katalog ({movies.length} Film)
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px' }}>
          {movies.length > 0 ? (
            movies.map(movie => (
              <div key={movie.id} style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                background: '#1a1a24', padding: '12px 15px', borderRadius: '8px', border: '1px solid #333'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{movie.title}</span>
                  <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{movie.genre.join(', ')}</span>
                </div>
                
                <button className='button-delete'
                  onClick={() => handleDelete(movie.id)} 
                >
                  Hapus
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: '#aaa', fontStyle: 'italic', textAlign: 'center' }}>Katalog kosong.</p>
          )}
        </div>
      </section>

      <div >
        <Link className = 'tombol-kembali' to="/" >← Kembali ke Beranda</Link>
      </div>

    </div>
  );
}