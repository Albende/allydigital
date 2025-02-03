// src/DataMatrixLanding.jsx
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import AnimatedBackground from './components/AnimatedBackground';
import HeroSection from './components/HeroSection';
import InitializeSystemOverlay from './components/InitializeSystemOverlay';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import StatsSection from './components/StatsSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import SplashScreen from './components/SplashScreen';

const DataMatrixLanding = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // If the URL hash is "#services" or if splash was already shown, skip it
    if (window.location.hash === '#services' || sessionStorage.getItem('splashShown') === 'true') {
      setShowSplash(false);
      // Scroll to services after skipping the splash
      setTimeout(() => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, []);

  const handleSplashFinish = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
    // Scroll to services if URL hash is "#services"
    if (window.location.hash === '#services') {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Show splash screen if needed */}
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      
      {/* Main content (hidden if splash is active) */}
      <div className={`${showSplash ? 'hidden' : 'block'} min-h-screen bg-gray-900 text-green-400`}>
        <AnimatedBackground />
        <NavBar />
        <HeroSection onInitialize={() => setIsInitializing(true)} />
        {isInitializing && <InitializeSystemOverlay onComplete={() => setIsInitializing(false)} />}
        <AboutSection />
        
        {/* Services Section with ID for scrolling */}
        <section id="services">
          <ServicesSection />
        </section>

        <ProjectsSection />
        <StatsSection />
        <ContactSection />
        <FooterSection />

        {/* Global styles for animations */}
        <style>{`
          @keyframes dataStream {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    </>
  );
};

export default DataMatrixLanding;
