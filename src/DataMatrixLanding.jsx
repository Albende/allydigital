// src/DataMatrixLanding.jsx
import React, { useState } from 'react';
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

  // Called when the "Initialize System" button is clicked
  const handleInitialize = () => {
    setIsInitializing(true);
  };

  // Called when the initialization overlay is finished
  const handleInitComplete = () => {
    setIsInitializing(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div className={`${showSplash ? 'hidden' : 'block'} min-h-screen bg-gray-900 text-green-400`}>
        <AnimatedBackground />
        <NavBar />
        <HeroSection onInitialize={handleInitialize} />
        {isInitializing && <InitializeSystemOverlay onComplete={handleInitComplete} />}
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <StatsSection />
        <ContactSection />
        <FooterSection />

        {/* Global styles for animations */}
        <style>{`
          @keyframes dataStream {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(100%);
            }
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 0.2;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default DataMatrixLanding;
