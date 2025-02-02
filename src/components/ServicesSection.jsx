// src/components/ServicesSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Monitor,
  GridIcon,
  Database,
  Share2,
  Activity,
  Binary
} from 'lucide-react';

const services = [
  {
    title: "AI.NEURAL.CORE",
    icon: <Brain size={32} className="text-green-400" />,
    features: [
      "Neural Network Chatbot Systems",
      "Predictive Behavioral Analytics",
      "NLP Content Enhancement",
      "AI Marketing Algorithm",
      "Process Automation Matrix"
    ],
    link: "/services/ai-neural-core"
  },
  {
    title: "WEB.QUANTUM.DEV",
    icon: <Monitor size={32} className="text-green-400" />,
    features: [
      "Dynamic User Interfaces",
      "Neural E-commerce Systems",
      "Quantum Web Applications",
      "Performance Architecture",
      "AI-Enhanced UX Protocols"
    ],
    link: "/services/web-quantum-dev"
  },
  {
    title: "DIGITAL.MATRIX.OPS",
    icon: <GridIcon size={32} className="text-green-400" />,
    features: [
      "Neural SEO Algorithms",
      "Content Generation Matrix",
      "Predictive Marketing AI",
      "Real-Time Analytics Grid",
      "Performance Tracking System"
    ],
    link: "/services/digital-matrix-ops"
  },
  {
    title: "DATA.NEXUS",
    icon: <Database size={32} className="text-green-400" />,
    features: [
      "Neural Behavior Analysis",
      "Conversion Optimization AI",
      "Advanced Analytics Matrix",
      "KPI Neural Networks",
      "Predictive Insights Engine"
    ],
    link: "/services/data-nexus"
  },
  {
    title: "SOCIAL.GRID.MATRIX",
    icon: <Share2 size={32} className="text-green-400" />,
    features: [
      "AI Content Distribution",
      "Social Pattern Analysis",
      "Influence Matrix Scanner",
      "Neural Engagement System",
      "Sentiment Analysis Core"
    ],
    link: "/services/social-grid-matrix"
  },
  {
    title: "BRAND.NEURAL.FORGE",
    icon: <Activity size={32} className="text-green-400" />,
    features: [
      "Neural Design Generation",
      "Brand Pattern Analysis",
      "Content Matrix Creation",
      "Video Enhancement Grid",
      "Multi-Neural Translation"
    ],
    link: "/services/brand-neural-forge"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-mono font-bold mb-16 text-center">
          Service.Matrix
          <span className="block text-sm text-green-500/60 mt-2">
            // Core Systems
          </span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link key={index} to={service.link} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 transform scale-95 group-hover:scale-100 transition-transform" />
              <div className="relative border border-green-500/30 bg-gray-900/90 p-6 hover:border-green-400 transition-colors">
                <div className="w-12 h-12 mb-4 text-green-400">
                  {service.icon}
                </div>
                <h3 className="text-xl font-mono font-bold mb-4">
                  {service.title}
                </h3>
                <ul className="space-y-2 text-green-300/80">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Binary size={16} className="mr-2 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
