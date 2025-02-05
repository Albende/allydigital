import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import AnimatedBackground from "./components/AnimatedBackground";
import HeroSection from "./components/HeroSection";
import InitializeSystemOverlay from "./components/InitializeSystemOverlay";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import StatsSection from "./components/StatsSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import SplashScreen from "./components/SplashScreen";

const DataMatrixLanding = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Hash-ə əsaslanan scroll funksiyası
  const scrollToSection = (hash) => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Səhifə tam yükləndikdən sonra (hətta back navigation zamanı) hash-ə uyğun scroll etmək üçün
  useEffect(() => {
    // Əgər splash əvvəldən göstərilibsə, onu gizlət
    if (sessionStorage.getItem("splashShown") === "true") {
      setShowSplash(false);
    }

    // Məzmunun render olunması üçün kiçik gecikmə əlavə edirik
    const timer = setTimeout(() => {
      scrollToSection(window.location.hash);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // URL-də hash dəyişdikdə scroll üçün listener əlavə edirik
  useEffect(() => {
    const handleHashChange = () => {
      // Yenə də kiçik gecikmə ilə, çünki bəzi hallarda DOM renderi bir az vaxt ala bilər
      setTimeout(() => {
        scrollToSection(window.location.hash);
      }, 300);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSplashFinish = () => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
    // Splash bitdikdən sonra, dərhal scroll əməliyyatını yerinə yetiririk
    setTimeout(() => {
      scrollToSection(window.location.hash);
    }, 300);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <div
        className={`${
          showSplash ? "hidden" : "block"
        } min-h-screen bg-gray-900 text-green-400`}
      >
        <AnimatedBackground />
        <NavBar />
        <HeroSection onInitialize={() => setIsInitializing(true)} />
        {isInitializing && (
          <InitializeSystemOverlay
            onComplete={() => setIsInitializing(false)}
          />
        )}
        <AboutSection />

        {/* Hər bölməyə unikal id verin */}
        <section id="services">
          <ServicesSection />
        </section>

        <ProjectsSection />
        <StatsSection />
        <ContactSection />
        <FooterSection />

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
