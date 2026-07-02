'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img 
              src="https://boardgamemanufacturing.com/wp-content/uploads/2019/04/free-parking1.png" 
              alt="Logo" 
              className="h-12 w-12 object-contain"
            />
            <span className={`font-bold text-xl ${isScrolled || theme === 'dark' ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
              PJ-APQ
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#about" 
              className={`font-medium transition-colors ${
                isScrolled || theme === 'dark' 
                  ? 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              ¿Qué es APQ?
            </a>
            <a 
              href="#team" 
              className={`font-medium transition-colors ${
                isScrolled || theme === 'dark' 
                  ? 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Equipo
            </a>
            <a 
              href="#contact" 
              className={`font-medium transition-colors ${
                isScrolled || theme === 'dark' 
                  ? 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Contacto
            </a>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isScrolled || theme === 'dark'
                  ? 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'hover:bg-white/20'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Login Button */}
            <a
              href="/auth/login"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Acceder
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg"
          >
            <svg className={`w-6 h-6 ${isScrolled || theme === 'dark' ? 'text-gray-900 dark:text-white' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="px-4 py-6 space-y-4">
            <a href="#about" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium">
              ¿Qué es APQ?
            </a>
            <a href="#team" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium">
              Equipo
            </a>
            <a href="#contact" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium">
              Contacto
            </a>
            <div className="flex items-center justify-between pt-4 border-t dark:border-gray-800">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <a
                href="/auth/login"
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full"
              >
                Acceder
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
