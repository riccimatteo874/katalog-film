import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '80px 20px', color: 'white', textAlign: 'center' }}>
      <h1 style={{ fontSize: '5rem', margin: '0 0 10px 0', color: '#dc3545' }}>404</h1>
      <h2 style={{ marginBottom: '20px' }}>Oops! Page Not Found</h2>
      <p style={{ color: '#aaa', marginBottom: '30px' }}>
        Looks like you're lost. The page you are looking for doesn't exist in this movie catalog.
      </p>
      
      <Link to="/" style={{ 
        padding: '10px 20px', backgroundColor: '#007bff', color: 'white', 
        textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' 
      }}>
        ← Back to Home
      </Link>
    </div>
  );
}
