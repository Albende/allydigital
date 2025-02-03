// src/pages/BrandNeuralForgePage.jsx
import React from 'react';
import { Activity, Palette, Video, Edit3, Type } from 'lucide-react';
import NavBar from '../components/NavBar';
import AnimatedBackground from '../components/AnimatedBackground';

const BrandNeuralForgePage = () => {
  const subServices = [
    {
      title: "Neural Design Generation",
      description:
        "Harness AI to generate on-brand visuals, streamlining creative assets for campaigns and promotions.",
      icon: <Palette size={24} className="text-green-400" />
    },
    {
      title: "Content Matrix Creation",
      description:
        "Produce multi-channel content strategies powered by AI insights to maximize brand impact.",
      icon: <Edit3 size={24} className="text-green-400" />
    },
    {
      title: "Brand Pattern Analysis",
      description:
        "Identify key brand elements and user perceptions with advanced pattern recognition algorithms.",
      icon: <Type size={24} className="text-green-400" />
    },
    {
      title: "Video Enhancement Grid",
      description:
        "Use AI for automated video editing, animation, and styling—ensuring consistent brand identity.",
      icon: <Video size={24} className="text-green-400" />
    },
    {
      title: "Multi-Neural Translation",
      description:
        "Expand your global reach with accurate, AI-powered translations that preserve tone and style.",
      icon: <Activity size={24} className="text-green-400" />
    },
  ];

  return (
    <div className="relative min-h-screen bg-gray-900 text-green-400">
      <AnimatedBackground />
      <div className="relative z-20">
        <NavBar />
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Activity size={48} className="text-green-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-mono">BRAND.NEURAL.FORGE</h1>
            </div>
            <p className="text-green-300/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Sculpt a bold brand identity powered by AI. From neural design generation to multi-lingual content creation, forge your brand presence in record time.
            </p>
          </div>
        </section>

        {/* Sub-services */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-mono font-bold mb-8 text-center">
              BRAND.NEURAL.FORGE.SUB-SERVICES
              <span className="block text-sm text-green-500/60 mt-2">// craft.engage.expand</span>
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {subServices.map((service, index) => (
                <div
                  key={index}
                  className="border border-green-500/30 bg-gray-900/80 p-6 hover:border-green-400 transition-colors"
                >
                  <div className="mb-4 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-mono font-bold mb-3">{service.title}</h3>
                  <p className="text-green-300/80 text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-mono font-bold mb-6">Ready to Forge Your Brand?</h2>
            <p className="text-green-300/80 mb-8">
              Unleash AI-driven creativity to build an unforgettable brand identity.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-green-500 text-gray-900 font-mono hover:bg-green-400 transition-colors"
            >
              Start Forging
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-green-500/20 py-8 text-center">
          <p className="text-green-300/80 font-mono">
            &copy; {new Date().getFullYear()} AIORBIS.TECH // BRAND.NEURAL.FORGE
          </p>
        </footer>
      </div>
    </div>
  );
};

export default BrandNeuralForgePage;
