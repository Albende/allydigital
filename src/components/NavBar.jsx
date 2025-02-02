import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // We'll check the current route to decide how the "CONTACT" link behaves
  const location = useLocation();
  const navigate = useNavigate();

  // Handler for the “Contact” item
  const handleContactClick = () => {
    // If we are currently on the landing page ("/"), scroll to #contact
    if (location.pathname === '/') {
      setMobileMenuOpen(false); // close mobile menu if open
      // use an anchor link approach:
      const contactSection = document.getElementById('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Otherwise, navigate to /contact
      setMobileMenuOpen(false);
      navigate('/contact');
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
                <Activity className="text-green-400" />
                <span className="text-2xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
      AIORBIS.TECH
                </span>
            </Link>
        </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {/* SERVICES link - always an anchor to #services on landing page */}
            <a
              href="/#services"
              className="font-mono text-sm tracking-wider hover:text-green-300 transition-colors relative group"
            >
              <span className="relative z-10">SERVICES</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>

            {/* ABOUT link */}
            <a
              href="/#about"
              className="font-mono text-sm tracking-wider hover:text-green-300 transition-colors relative group"
            >
              <span className="relative z-10">ABOUT</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>

            {/* PROJECTS link */}
            <a
              href="/#projects"
              className="font-mono text-sm tracking-wider hover:text-green-300 transition-colors relative group"
            >
              <span className="relative z-10">PROJECTS</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>

            {/* CONTACT link — calls handler */}
            <button
              onClick={handleContactClick}
              className="font-mono text-sm tracking-wider hover:text-green-300 transition-colors relative group"
            >
              <span className="relative z-10">CONTACT</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            {!mobileMenuOpen ? (
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open Menu"
                className="text-green-400 hover:text-green-300"
              >
                <Menu />
              </button>
            ) : (
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
                className="text-green-400 hover:text-green-300"
              >
                <X />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900/90 border-t border-green-500/20">
          <div className="flex flex-col space-y-4 px-4 py-4 font-mono">
            <a
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm tracking-wider hover:text-green-300 transition-colors"
            >
              SERVICES
            </a>
            <a
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm tracking-wider hover:text-green-300 transition-colors"
            >
              ABOUT
            </a>
            <a
              href="/#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm tracking-wider hover:text-green-300 transition-colors"
            >
              PROJECTS
            </a>
            {/* CONTACT link in mobile menu => same handle */}
            <button
              onClick={handleContactClick}
              className="text-left text-sm tracking-wider hover:text-green-300 transition-colors"
            >
              CONTACT
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;