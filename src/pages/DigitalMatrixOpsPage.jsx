// src/pages/DigitalMatrixOpsPage.jsx
import React from 'react';
import { GridIcon, PieChart, Compass, TrendingUp, Share2 } from 'lucide-react';
import NavBar from '../components/NavBar';
import AnimatedBackground from '../components/AnimatedBackground';

const DigitalMatrixOpsPage = () => {
  const subServices = [
    {
      title: "Neural SEO Algorithms",
      description:
        "Advanced machine-driven SEO strategies that adapt to search engine changes in real-time.",
      icon: <Compass size={24} className="text-green-400" />
    },
    {
      title: "Predictive Marketing AI",
      description:
        "Use data-driven insights to forecast user trends and automate campaign adjustments for optimal ROI.",
      icon: <TrendingUp size={24} className="text-green-400" />
    },
    {
      title: "Real-Time Analytics Grid",
      description:
        "Unified dashboard of metrics that update instantly, helping you spot opportunities and anomalies.",
      icon: <PieChart size={24} className="text-green-400" />
    },
    {
      title: "Performance Tracking System",
      description:
        "Track KPIs and conversions with AI-based anomaly detection to ensure continuous growth and stability.",
      icon: <Share2 size={24} className="text-green-400" />
    },
    {
      title: "Content Generation Matrix",
      description:
        "Automate content creation with AI for social posts, ads, blogs, and more—aligned to your brand voice.",
      icon: <GridIcon size={24} className="text-green-400" />
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
              <GridIcon size={48} className="text-green-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-mono">DIGITAL.MATRIX.OPS</h1>
            </div>
            <p className="text-green-300/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Transform your digital operations with AI-driven optimizations. From predictive marketing to real-time analytics, harness the full potential of data to fuel your business growth.
            </p>
          </div>
        </section>

        {/* Sub-services */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-mono font-bold mb-8 text-center">
              DIGITAL.MATRIX.OPS.SUB-SERVICES
              <span className="block text-sm text-green-500/60 mt-2">// automate.optimize</span>
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
            <h2 className="text-3xl font-mono font-bold mb-6">Ready to Go Matrix-Level?</h2>
            <p className="text-green-300/80 mb-8">
              Take a step into the new age of digital operations where automation and insight drive every decision.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-green-500 text-gray-900 font-mono hover:bg-green-400 transition-colors"
            >
              Automate Now
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-green-500/20 py-8 text-center">
          <p className="text-green-300/80 font-mono">
            &copy; {new Date().getFullYear()} AIORBIS.TECH // DIGITAL.MATRIX.OPS
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DigitalMatrixOpsPage;
