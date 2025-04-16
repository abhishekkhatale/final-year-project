import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiMenu, 
  FiX, 
  FiLogOut, 
  FiHome,
  FiBook,
  FiSettings,
  FiUser,
  FiMap,
  FiAward
} from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user?.email === 'admin@gmail.com') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex justify-between items-center h-16">
          {/* Left - Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/dashboard" className="ml-2 text-xl font-bold text-black hidden sm:block">
              Webroom
            </Link>
          </div>

          {/* Middle - Navigation (Desktop) */}
          <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
            <nav className="flex space-x-8">
              <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                <FiHome className="h-5 w-5" />
                <span className="ml-2">Dashboard</span>
              </Link>

              <Link to="/aiquiz" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                <FiAward className="h-5 w-5" />
                <span className="ml-2">AI Mock test</span>
              </Link>
              <Link to="/note" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                <FiBook className="h-5 w-5" />
                <span className="ml-2">Study Material</span>
              </Link>
            </nav>
          </div>

          {/* Right - Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAdmin && (
              <Link to="/admin" className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                <FiSettings className="h-5 w-5" />
                <span className="ml-2">Admin Panel</span>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 transition-colors"
            >
              <FiLogOut className="h-5 w-5" />
              <span className="ml-2">Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/dashboard" className="flex items-center px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors" onClick={() => setIsOpen(false)}>
              <FiHome className="h-5 w-5" />
              <span className="ml-3">Dashboard</span>
            </Link>
            <Link to="/ai-roadmap" className="flex items-center px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors" onClick={() => setIsOpen(false)}>
              <FiMap className="h-5 w-5" />
              <span className="ml-3">AI Roadmap</span>
            </Link>
            <Link to="/ai-mentor" className="flex items-center px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors" onClick={() => setIsOpen(false)}>
              <FiAward className="h-5 w-5" />
              <span className="ml-3">AI Mentor</span>
            </Link>
            <Link to="/note" className="flex items-center px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors" onClick={() => setIsOpen(false)}>
              <FiBook className="h-5 w-5" />
              <span className="ml-3">Study Material</span>
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAdmin && (
              <Link to="/admin" className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setIsOpen(false)}>
                <FiSettings className="h-5 w-5" />
                <span className="ml-3">Admin Panel</span>
              </Link>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLogout(e);
                setIsOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <FiLogOut className="h-5 w-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
