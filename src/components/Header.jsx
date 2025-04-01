import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const middleItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <FiHome className="h-5 w-5" /> },
    { name: 'AI Roadmap', href: '/ai-roadmap', icon: <FiMap className="h-5 w-5" /> },
    { name: 'AI Mentor', href: '/ai-mentor', icon: <FiAward className="h-5 w-5" /> },
    { name: 'Study Material', href: '/studymaterial', icon: <FiBook className="h-5 w-5" /> }
  ];

  const rightItems = [
    { name: 'Admin Panel', href: '/admin', icon: <FiSettings className="h-5 w-5" /> },
    { name: 'Logout', href: '/logout', icon: <FiLogOut className="h-5 w-5" /> }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex justify-between items-center h-16">
          {/* Left - Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            
            <span className="ml-2 text-xl font-bold text-black hidden sm:block">Webroom</span>
          </div>

          {/* Middle - Navigation (Desktop) */}
          <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
            <nav className="flex space-x-8">
              {middleItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Right - Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {rightItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${item.name === 'Logout' ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-50'} transition-colors`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="pt-2 pb-3 space-y-1">
            {middleItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {rightItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-base font-medium ${item.name === 'Logout' ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-50'} transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;