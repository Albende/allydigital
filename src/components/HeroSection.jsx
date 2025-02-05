// src/components/HeroSection.jsx
import React from "react";

const HeroSection = ({ onInitialize }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4 opacity-10">
        {Array.from({ length: 144 }).map((_, i) => (
          <div
            key={i}
            className="border border-green-500/20"
            style={{
              animation: `pulse ${2 + Math.random() * 2}s infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-7xl font-bold mb-8 font-mono">
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
            AIOrbis Digital Agency
          </span>
          <br />
          <span className="inline-block">
            AI-Powered Solutions for Your Growth
          </span>
        </h1>

        <p className="text-lg md:text-xl text-green-300/80 mb-12 max-w-3xl mx-auto font-mono">
          We transform your ideas into dynamic digital solutions. With
          creativity, technology, and AI-driven insights, we deliver results
          that set your brand apart.
        </p>

        <div className="flex justify-center gap-6">
          <button
            className="px-8 py-3 bg-green-500 text-gray-900 font-mono hover:bg-green-400 transition-colors relative group overflow-hidden"
            onClick={onInitialize}
          >
            <span className="relative z-10">Initialize System</span>
            <span className="absolute inset-0 bg-green-300 transform -translate-x-full group-hover:translate-x-0 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
