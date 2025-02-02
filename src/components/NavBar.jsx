// src/components/NavBar.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';

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
      const contactSection = document.getElementById('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Otherwise, navigate to /contact
      setMobileMenuOpen(false);
      navigate('/contact');
    }
  };

  // TEMP: No actual language switching logic (since we aren't modifying routes yet).
  // These placeholders just show where you'd handle language changes if desired.
  const switchToEnglish = () => {
    console.log('Switch to EN (placeholder)');
  };
  const switchToRussian = () => {
    console.log('Switch to RU (placeholder)');
  };
  const switchToAzerbaijani = () => {
    console.log('Switch to AZ (placeholder)');
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
            <a
              href="/#services"
              className="font-mono text-sm tracking-wider hover:text-green-300 transition-colors relative group"
            >
              <span className="relative z-10">SERVICES</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>

            <a
              href="/#about"
              className="font-mono text-sm tracking-wider hover:text-green-300 transition-colors relative group"
            >
              <span className="relative z-10">ABOUT</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>

            <a
              href="/#projects"
              className="font-mono text-sm tracking-wider hover:text-green-300 transition-colors relative group"
            >
              <span className="relative z-10">PROJECTS</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>

            <button
              onClick={handleContactClick}
              className="font-mono text-sm tracking-wider hover:text-green-300 transition-colors relative group"
            >
              <span className="relative z-10">CONTACT</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>

            {/* Language Selector with react-country-flag */}
            <div className="relative group">
              <button
                className="font-mono text-sm tracking-wider hover:text-green-300 transition-colors flex items-center space-x-2"
              >
                {/* Example default flag + label (English) */}
                <ReactCountryFlag
                  countryCode="GB"
                  svg
                  className="w-5 h-5"
                />
                <span className="relative z-10">EN</span>
              </button>
              {/* On hover, show dropdown with other flags */}
              <div className="absolute hidden group-hover:block top-full right-0 mt-1 bg-gray-900 border border-green-500/20 text-green-300 w-24">
                <button
                  onClick={switchToEnglish}
                  className="flex items-center w-full px-3 py-2 hover:bg-gray-800"
                >
                  <ReactCountryFlag countryCode="GB" svg className="w-5 h-5 mr-2" />
                  EN
                </button>
                <button
                  onClick={switchToRussian}
                  className="flex items-center w-full px-3 py-2 hover:bg-gray-800"
                >
                  <ReactCountryFlag countryCode="RU" svg className="w-5 h-5 mr-2" />
                  RU
                </button>
                <button
                  onClick={switchToAzerbaijani}
                  className="flex items-center w-full px-3 py-2 hover:bg-gray-800"
                >
                  <ReactCountryFlag countryCode="AZ" svg className="w-5 h-5 mr-2" />
                  AZ
                </button>
              </div>
            </div>
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
            <button
              onClick={handleContactClick}
              className="text-left text-sm tracking-wider hover:text-green-300 transition-colors"
            >
              CONTACT
            </button>

            {/* Language Selector (Mobile) */}
            <div className="flex space-x-4 mt-2">
              <button onClick={switchToEnglish}>
                <ReactCountryFlag countryCode="GB" svg className="w-5 h-5" />
              </button>
              <button onClick={switchToRussian}>
                <ReactCountryFlag countryCode="RU" svg className="w-5 h-5" />
              </button>
              <button onClick={switchToAzerbaijani}>
                <ReactCountryFlag countryCode="AZ" svg className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
