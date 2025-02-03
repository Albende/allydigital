// src/pages/SocialGridMatrixPage.jsx
import React from 'react';
import { Share2, MessageCircle, Users, HeartPulse, Mic2 } from 'lucide-react';
import NavBar from '../components/NavBar';
import AnimatedBackground from '../components/AnimatedBackground';

const SocialGridMatrixPage = () => {
  const subServices = [
    {
      title: "AI Content Distribution",
      description:
        "Automate and optimize social media scheduling for peak reach, analyzing real-time engagement patterns.",
      icon: <MessageCircle size={24} className="text-green-400" />
    },
    {
      title: "Influence Matrix Scanner",
      description:
        "Identify key influencers and brand advocates within your audience to supercharge your campaigns.",
      icon: <Users size={24} className="text-green-400" />
    },
    {
      title: "Neural Engagement System",
      description:
        "Use predictive AI to craft hyper-relevant posts, boosting interaction and fostering community loyalty.",
      icon: <HeartPulse size={24} className="text-green-400" />
    },
    {
      title: "Sentiment Analysis Core",
      description:
        "Monitor brand sentiment across social channels; detect negative spikes instantly and respond proactively.",
      icon: <Mic2 size={24} className="text-green-400" />
    },
    {
      title: "Real-Time Social Analytics",
      description:
        "Consolidate performance metrics from all platforms into a single, AI-enhanced analytics dashboard.",
      icon: <Share2 size={24} className="text-green-400" />
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
              <Share2 size={48} className="text-green-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-mono">SOCIAL.GRID.MATRIX</h1>
            </div>
            <p className="text-green-300/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Elevate your social presence with a matrix of AI-boosted engagement, influencer insights, and real-time sentiment analysis. Watch your brand community thrive.
            </p>
          </div>
        </section>

        {/* Sub-services */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-mono font-bold mb-8 text-center">
              SOCIAL.GRID.MATRIX.SUB-SERVICES
              <span className="block text-sm text-green-500/60 mt-2">// connect.engage.grow</span>
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
            <h2 className="text-3xl font-mono font-bold mb-6">Ready to Grow Your Audience?</h2>
            <p className="text-green-300/80 mb-8">
              Engage with customers in more meaningful ways and stay on top of your brand voice.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-green-500 text-gray-900 font-mono hover:bg-green-400 transition-colors"
            >
              Let's Connect
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-green-500/20 py-8 text-center">
          <p className="text-green-300/80 font-mono">
            &copy; {new Date().getFullYear()} AIORBIS.TECH // SOCIAL.GRID.MATRIX
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SocialGridMatrixPage;
