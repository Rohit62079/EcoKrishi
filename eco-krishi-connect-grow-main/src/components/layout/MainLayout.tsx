
import React, { useState } from 'react';
import { Bell, Menu, Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector';
import { Button } from '../ui/button';
import { SignedIn, SignedOut, useAuth } from '../../contexts/AuthContext';
import ProfileMenu from '../auth/ProfileMenu';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-eco-light">
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="eco-container py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100 md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="flex items-center">
              <span className="text-eco-primary font-display font-bold text-xl">Eco</span>
              <span className="text-eco-dark font-display font-bold text-xl">Krishi</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-eco-primary transition-colors">Home</Link>
            <Link to="#" className="text-gray-700 hover:text-eco-primary transition-colors">Knowledge Hub</Link>
            <Link to="#" className="text-gray-700 hover:text-eco-primary transition-colors">Community</Link>
            <Link to="#" className="text-gray-700 hover:text-eco-primary transition-colors">Marketplace</Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <button 
              className="p-2 rounded-full hover:bg-gray-100" 
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <SignedIn>
              <button 
                className="p-2 rounded-full hover:bg-gray-100" 
                aria-label="Notifications"
              >
                <Bell size={20} />
              </button>
              <ProfileMenu />
            </SignedIn>
            
            <SignedOut>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/sign-in')}
                className="text-sm"
              >
                Sign In
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => navigate('/sign-up')}
                className="text-sm bg-eco-primary hover:bg-eco-primary/90"
              >
                Sign Up
              </Button>
            </SignedOut>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />
      
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <span className="text-eco-primary font-display font-bold text-xl">Eco</span>
              <span className="text-eco-dark font-display font-bold text-xl">Krishi</span>
            </Link>
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link to="/" className="block py-2 px-4 rounded-md hover:bg-eco-light text-gray-700 hover:text-eco-primary transition-colors">Home</Link>
            </li>
            <li>
              <Link to="#" className="block py-2 px-4 rounded-md hover:bg-eco-light text-gray-700 hover:text-eco-primary transition-colors">Knowledge Hub</Link>
            </li>
            <li>
              <Link to="#" className="block py-2 px-4 rounded-md hover:bg-eco-light text-gray-700 hover:text-eco-primary transition-colors">Community</Link>
            </li>
            <li>
              <Link to="#" className="block py-2 px-4 rounded-md hover:bg-eco-light text-gray-700 hover:text-eco-primary transition-colors">Marketplace</Link>
            </li>
            
            <SignedOut>
              <li className="pt-4 border-t border-gray-100">
                <Link to="/sign-in" className="block py-2 px-4 rounded-md hover:bg-eco-light text-gray-700 hover:text-eco-primary transition-colors">Sign In</Link>
              </li>
              <li>
                <Link to="/sign-up" className="block py-2 px-4 rounded-md bg-eco-primary text-white hover:bg-eco-primary/90 transition-colors">Sign Up</Link>
              </li>
            </SignedOut>
            
            <SignedIn>
              <li className="pt-4 border-t border-gray-100">
                <Link to="#" className="block py-2 px-4 rounded-md hover:bg-eco-light text-gray-700 hover:text-eco-primary transition-colors">My Profile</Link>
              </li>
              <li>
                <Link to="#" className="block py-2 px-4 rounded-md hover:bg-eco-light text-gray-700 hover:text-eco-primary transition-colors">Settings</Link>
              </li>
            </SignedIn>
          </ul>
        </nav>
      </div>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-eco-dark text-white py-8">
        <div className="eco-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-display font-bold text-xl mb-4">
                <span className="text-eco-accent">Eco</span>Krishi
              </h3>
              <p className="text-gray-300 text-sm">
                Empowering rural organic farmers through connectivity, knowledge sharing, and market access.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Knowledge Hub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Government Schemes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disease Detection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Practices</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Local Weather</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <p className="text-sm text-gray-300 mb-4">
                Have questions or feedback? Reach out to our support team.
              </p>
              <button className="bg-eco-primary hover:bg-eco-dark text-white rounded-md px-4 py-2 text-sm transition-colors border border-eco-primary">
                Contact Support
              </button>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400 text-center">
            <p>© 2025 EcoKrishi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
