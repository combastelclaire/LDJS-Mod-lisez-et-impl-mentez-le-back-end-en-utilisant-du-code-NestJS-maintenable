import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          ChâTop
        </Link>
        <nav className="flex gap-4">
          {token ? (
            <>
              <Link to="/" className="text-gray-700 hover:text-primary">
                Accueil
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-primary">
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-primary"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-primary">
                Connexion
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-primary">
                Inscription
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
