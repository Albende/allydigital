import React from 'react';
import { Monitor, Cpu, Layout, Code2, Globe2, Server } from 'lucide-react';
import NavBar from '../components/NavBar';

const WebQuantumDevPage = () => {
  const subServices = [
    {
      title: "Quantum-Optimized Architecture",
      description:
        "Leverage cutting-edge frameworks to deliver ultra-responsive, resilient web apps for peak performance.",
      icon: <Cpu size={24} className="text-green-400" />
    },
    {
      title: "Neural E-Commerce Systems",
      description:
        "Integrate AI-driven product recommendations, seamless checkout flows, and dynamic user personalization.",
      icon: <Globe2 size={24} className="text-green-400" />
    },
    {
      title: "Progressive Web Platforms",
      description:
        "Build cross-platform applications that load instantly, work offline, and handle heavy traffic effortlessly.",
      icon: <Layout size={24} className="text-green-400" />
    },
    {
      title: "Serverless & Microservices",
      description:
        "Adopt a flexible backend architecture that scales on-demand, reducing operational costs and complexities.",
      icon: <Server size={24} className="text-green-400" />
    },
    {
      title: "AI-Enhanced UX Protocols",
      description:
        "Infuse advanced analytics into your UX design to continuously optimize user journeys in real-time.",
      icon: <Code2 size={24} className="text-green-400" />
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-green-400">
                      <NavBar />
      {/* Hero */}
      <section className="flex flex-col items-center justify-center py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Monitor size={48} className="text-green-400 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-mono">
              WEB.QUANTUM.DEV
            </h1>
          </div>
          <p className="text-green-300/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Experience the next generation of web development—blazingly fast, highly
            scalable, and powered by advanced AI capabilities. Push your digital presence
            to the quantum edge.
          </p>
        </div>
      </section>

      {/* Sub-services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-mono font-bold mb-8 text-center">
            WEB.QUANTUM.DEV.SUB-SERVICES
            <span className="block text-sm text-green-500/60 mt-2">
              // next.level.web
            </span>
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
                <h3 className="text-xl font-mono font-bold mb-3">
                  {service.title}
                </h3>
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
          <h2 className="text-3xl font-mono font-bold mb-6">
            Ready to Go Quantum?
          </h2>
          <p className="text-green-300/80 mb-8">
            Supercharge your web platform for maximum performance and reliability.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-green-500 text-gray-900 font-mono hover:bg-green-400 transition-colors"
          >
            Let's Build
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-500/20 py-8 text-center">
        <p className="text-green-300/80 font-mono">
          &copy; {new Date().getFullYear()} AIORBIS.TECH // WEB.QUANTUM.DEV
        </p>
      </footer>
    </div>
  );
};

export default WebQuantumDevPage;
