import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { BellIcon, CreditCardIcon, UserCircleIcon, ChartBarIcon, MenuIcon, XIcon } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if(user !=null){
        setUser(user.name);
    }else{
        navigate("/login");
    }
  },[])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white bg-opacity-90 shadow-lg' : 'bg-white bg-opacity-70'
    } backdrop-blur-sm rounded-b-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center mr-2">
                <CreditCardIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">SubDub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="flex items-center text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
            >
              <ChartBarIcon className="mr-1 h-4 w-4 text-purple-500" />
              Dashboard
            </Link>
            <Link
              to="/subscriptions"
              className="flex items-center text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
            >
              <CreditCardIcon className="mr-1 h-4 w-4 text-pink-500" />
              Subscriptions
            </Link>
            <Link
              to="/upcoming"
              className="flex items-center text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
            >
              <div className="mr-1">🔔</div>
              Upcoming
            </Link>
            
            {/* Notification Bell */}
            <button className="relative p-1 rounded-full hover:bg-purple-100 transition-colors duration-300">
              <BellIcon className="h-5 w-5 text-purple-500" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white text-xs">
                  {notifications}
                </span>
              )}
            </button>
            
            {/* Profile Button */}
            <Link
              to="/profile"
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 hover:from-pink-200 hover:via-purple-200 hover:to-blue-200 transition-all duration-300"
            >
              <UserCircleIcon className="h-5 w-5 text-purple-600" />
              <span className="text-gray-700 font-medium">{user || "Profile"}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-purple-100 focus:outline-none transition-all duration-300"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white bg-opacity-95 rounded-b-lg shadow-lg overflow-hidden transition-all duration-300">
          <div className="px-4 pt-2 pb-3 space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:via-purple-100 hover:to-blue-100 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <ChartBarIcon className="mr-3 h-5 w-5 text-purple-500" />
              Dashboard
            </Link>
            <Link
              to="/subscriptions"
              className="flex items-center text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:via-purple-100 hover:to-blue-100 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <CreditCardIcon className="mr-3 h-5 w-5 text-pink-500" />
              Subscriptions
            </Link>
            <Link
              to="/upcoming"
              className="flex items-center text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:via-purple-100 hover:to-blue-100 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="mr-3 text-lg">🔔</div>
              Upcoming Payments
            </Link>
            <Link
              to="/profile"
              className="flex items-center text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:via-purple-100 hover:to-blue-100 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserCircleIcon className="mr-3 h-5 w-5 text-indigo-500" />
              Profile
            </Link>
            
            {/* Quick Stats Section in Mobile Menu */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="px-3 py-2">
                <p className="text-xs font-medium text-gray-500">SUBSCRIPTION SUMMARY</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="bg-pink-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Active</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">14</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">This Month</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">$156.99</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;