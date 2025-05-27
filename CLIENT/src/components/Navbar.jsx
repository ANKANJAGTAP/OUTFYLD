import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="relative max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="OUTFYLD Logo"
            className="h-13 w-13 sm:h-14 sm:w-15 md:h-24 md:w-23 object-cover mt-3"
          />
          <NavLink
            to="/"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide hover:text-cyan-300 transition-colors duration-300"
          >
            OUTFYLD
          </NavLink>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-10 text-lg absolute left-1/2 transform -translate-x-1/2">
          {navItems.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative px-1 transition-colors duration-300 tracking-wide
                ${isActive ? 'text-white font-semibold' : 'text-white/70'}
                hover:text-white after:absolute after:-bottom-1 after:left-0
                after:w-0 hover:after:w-full after:h-[2px] after:bg-cyan-400
                after:transition-all after:duration-300`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center space-x-5">
          <NavLink
            to="/signup"
            className="px-5 py-2 border border-cyan-300 text-white font-semibold rounded-full
                        hover:bg-cyan-300 hover:text-black transition-colors duration-300"
          >
            Sign Up
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white hover:text-cyan-300 transition-colors duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-30 backdrop-blur-md text-white shadow-md px-6 pt-4 pb-6 space-y-4">
          {navItems.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-lg transition-colors duration-200
                ${isActive ? 'text-white font-semibold' : 'text-white/80'}
                hover:text-white`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <NavLink
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="block text-center border border-cyan-300 text-white font-bold py-2 rounded-full
                        hover:bg-cyan-300 hover:text-black transition-colors duration-300"
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
