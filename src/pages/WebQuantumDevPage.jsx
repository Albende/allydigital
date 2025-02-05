import React, { useState } from "react";
import { Monitor, Cpu, Layout, Code2, Globe2, Server } from "lucide-react";
import NavBar from "../components/NavBar";
import AnimatedBackground from "../components/AnimatedBackground";
import SubServiceItem from "../components/SubServiceItem";

const WebQuantumDevPage = () => {
  const [activeCard, setActiveCard] = useState(null);

  const subServices = [
    {
      title: "Quantum-Optimized Architecture",
      description:
        "Leverage cutting-edge frameworks to deliver ultra-responsive, resilient web apps for peak performance.",
      icon: <Cpu size={24} className="text-green-400" />,
      fullDescription:
        "Quantum-Optimized Architecture combines the latest web frameworks with AI-driven performance tuning to deliver ultra-responsive and resilient web applications. This approach minimizes latency and maximizes scalability for peak performance.",
    },
    {
      title: "Neural E-Commerce Systems",
      description:
        "Integrate AI-driven product recommendations, seamless checkout flows, and dynamic user personalization.",
      icon: <Globe2 size={24} className="text-green-400" />,
      fullDescription:
        "Neural E-Commerce Systems leverage AI to create personalized shopping experiences. From dynamic product recommendations to seamless checkout flows, every aspect is optimized to boost conversion and enhance user satisfaction.",
    },
    {
      title: "Progressive Web Platforms",
      description:
        "Build cross-platform applications that load instantly, work offline, and handle heavy traffic effortlessly.",
      icon: <Layout size={24} className="text-green-400" />,
      fullDescription:
        "Progressive Web Platforms are designed to work seamlessly across devices and network conditions. With instant load times, offline support, and robust performance under heavy traffic, these platforms redefine user engagement.",
    },
    {
      title: "Serverless & Microservices",
      description:
        "Adopt a flexible backend architecture that scales on-demand, reducing operational costs and complexities.",
      icon: <Server size={24} className="text-green-400" />,
      fullDescription:
        "Our Serverless & Microservices architecture provides a scalable, flexible backend solution. By leveraging on-demand resources and modular services, it minimizes costs and simplifies operations while delivering robust performance.",
    },
    {
      title: "AI-Enhanced UX Protocols",
      description:
        "Infuse advanced analytics into your UX design to continuously optimize user journeys in real-time.",
      icon: <Code2 size={24} className="text-green-400" />,
      fullDescription:
        "AI-Enhanced UX Protocols integrate advanced analytics directly into the user experience. This continuous feedback loop ensures that every user journey is optimized in real time, resulting in higher engagement and satisfaction.",
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
              <Monitor size={48} className="text-green-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-mono">
                WEB.QUANTUM.DEV
              </h1>
            </div>
            <p className="text-green-300/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Experience the next generation of web development—blazingly fast,
              highly scalable, and powered by advanced AI capabilities. Push your digital presence to the quantum edge.
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
                <SubServiceItem
                  key={index}
                  index={index}
                  service={service}
                  activeIndex={activeCard}
                  setActiveIndex={setActiveCard}
                />
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
    </div>
  );
};

export default WebQuantumDevPage;
