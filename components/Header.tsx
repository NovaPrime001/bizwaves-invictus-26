
import React, { useState, useEffect } from 'react';
import { navLinks } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/50 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="/" className="text-3xl font-bold font-league-gothic text-white uppercase tracking-widest">
          INVICTUS'26
        </a>
        <div className="flex items-center">
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-white hover:text-cyan-400 transition-colors duration-300 font-semibold tracking-wider">
                {link.name}
              </a>
            ))}
          </nav>
          <div className="hidden md:block ml-8">
             <a href="/admin" title="Admin Login" className="text-gray-400 hover:text-cyan-400 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
             </a>
          </div>
          <div className="md:hidden ml-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md">
          <nav className="flex flex-col items-center py-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="py-2 text-white hover:text-cyan-400 transition-colors duration-300" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
             <a href="/admin" className="py-2 text-white hover:text-cyan-400 transition-colors duration-300" onClick={() => setIsOpen(false)}>
                Admin Login
              </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;