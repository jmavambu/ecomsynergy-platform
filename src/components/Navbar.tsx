
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glass shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-medium tracking-tighter relative"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              ESSENCE
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm tracking-wide transition-colors hover:text-primary ${
                location.pathname === '/' ? 'font-medium' : 'text-muted-foreground'
              }`}
            >
              HOME
            </Link>
            <Link 
              to="/products" 
              className={`text-sm tracking-wide transition-colors hover:text-primary ${
                location.pathname === '/products' ? 'font-medium' : 'text-muted-foreground'
              }`}
            >
              SHOP
            </Link>
            <Link 
              to="/account" 
              className={`text-sm tracking-wide transition-colors hover:text-primary ${
                location.pathname === '/account' ? 'font-medium' : 'text-muted-foreground'
              }`}
            >
              ACCOUNT
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/account" className="p-2 rounded-full hover:bg-secondary transition-colors">
              <User size={20} />
            </Link>
            <Link to="/cart" className="p-2 rounded-full hover:bg-secondary transition-colors relative">
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {items.length}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass shadow-md animate-slide-down">
          <div className="py-5 px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-sm tracking-wide py-2 transition-colors ${
                location.pathname === '/' ? 'font-medium' : 'text-muted-foreground'
              }`}
            >
              HOME
            </Link>
            <Link 
              to="/products" 
              className={`text-sm tracking-wide py-2 transition-colors ${
                location.pathname === '/products' ? 'font-medium' : 'text-muted-foreground'
              }`}
            >
              SHOP
            </Link>
            <Link 
              to="/account" 
              className={`text-sm tracking-wide py-2 transition-colors ${
                location.pathname === '/account' ? 'font-medium' : 'text-muted-foreground'
              }`}
            >
              ACCOUNT
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
