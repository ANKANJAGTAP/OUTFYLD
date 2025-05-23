import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-olive shadow-md fixed top-0 left-0 w-full z-50">
      <div className="relative max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo + Brand */}
        <div className="flex items-center gap-1 sm:gap-2">
          <img
            src="/images/logo.png"
            alt="OUTFYLD Logo"
            className={
              `
              h-16 w-16        /* 4rem base */
              sm:h-20 sm:w-20  /* 5rem on small screens+ */
              md:h-28 md:w-28  /* 7rem on medium screens+ */
              rounded-full object-cover flex-shrink-0
            `}
          />
          <NavLink
            to="/"
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight"
          >
            OUTFYLD
          </NavLink>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-8 text-lg absolute left-1/2 transform -translate-x-1/2">
          {navItems.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative transition-colors duration-200 ${
                  isActive
                    ? 'text-white after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-white'
                    : 'text-green-100 hover:text-white'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="p-2 rounded-full bg-white dark:bg-charcoal border border-lightGray dark:border-lightGray/30 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-neonGreen"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-charcoal" />
            ) : (
              <Sun className="w-5 h-5 text-neonGreen" />
            )}
          </button>
          <NavLink
            to="/signup"
            className="px-5 py-2 bg-white text-green-600 rounded-full hover:bg-green-50 transition duration-200"
          >
            Sign Up
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu (hamburger)"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden bg-green-600 shadow-md px-6 pt-2 pb-4 space-y-4">
          {navItems.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-lg transition-colors duration-200 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-green-100 hover:text-white'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="flex items-center justify-center w-full space-x-2 bg-white/20 hover:bg-white/30 text-white py-2 rounded-full transition"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
          <NavLink
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-white text-green-600 py-2 rounded-full hover:bg-green-50 transition duration-200"
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
