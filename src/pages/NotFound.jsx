import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '80px 20px', color: 'white', textAlign: 'center' }}>
      <h1 style={{ fontSize: '5rem', margin: '0 0 10px 0', color: '#dc3545' }}>404</h1>
      <h2 style={{ marginBottom: '20px' }}>Oops! Halaman Tidak Ditemukan</h2>
      <p style={{ color: '#aaa', marginBottom: '30px' }}>
        Sepertinya kamu tersesat. Halaman yang kamu cari tidak ada di katalog film ini.
      </p>
      
      <Link to="/" style={{ 
        padding: '10px 20px', backgroundColor: '#007bff', color: 'white', 
        textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' 
      }}>
        ← Kembali ke Beranda
      </Link>
    </div>
  );
}