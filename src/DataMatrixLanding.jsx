import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Binary,
  Brain,
  Code,
  Network,
  Database,
  GridIcon,
  BarChart,
  Share2,
  Monitor,
  Menu,
  X
} from 'lucide-react';

/**
 * DataMatrixLanding — Main Landing Page Component
 */
const DataMatrixLanding = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState(null);

  // ---------- Initialize System Overlay States ----------
  const [isInitializing, setIsInitializing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  // ---------- Mobile Menu State ----------
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let timer;
    if (isInitializing) {
      setProgress(0);
      setShowSuccessMsg(false);

      // Increment progress for smoother animation
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setShowSuccessMsg(true);

            // Auto-close overlay shortly after hitting 100%
            setTimeout(() => {
              setIsInitializing(false);
              setShowSuccessMsg(false);
            }, 1000);

            return 100;
          }
          return prev + 0.5;
        });
      }, 20);
    }
    return () => clearInterval(timer);
  }, [isInitializing]);

  // ---------- Typewriter Effect for About Section ----------
  const aboutRef = useRef(null); // Reference to the "ABOUT" section
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [typedParagraphs, setTypedParagraphs] = useState(["", "", ""]);

  // The original text for the 3 paragraphs on the left column
  const aboutParagraphs = [
    "At Ally Digital Agency, we transform your ideas into dynamic digital solutions. Whether you're a small business seeking growth, a tech startup scaling your innovations, or an enterprise optimizing operations, we empower your journey.",
    "We’re not just a service provider; we’re your ally in the digital landscape. Our blend of creativity, technology, and AI-driven insights delivers results that set your brand apart.",
    "We’re passionate about staying ahead of the curve, ensuring our clients leverage the latest tools and strategies to excel in competitive markets."
  ];

  // 1) Observe if the About section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
        }
      },
      { threshold: 0.2 } // triggers when ~20% of the element is visible
    );
    if (aboutRef.current) observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, []);

  // 2) Typewriter effect once About section is visible
  useEffect(() => {
    if (!isAboutVisible) return;

    // Type out each paragraph
    aboutParagraphs.forEach((paragraph, pIndex) => {
      let charIndex = 0;

      // Immediately append the first character
      setTypedParagraphs((prev) => {
        const updated = [...prev];
        updated[pIndex] = paragraph[charIndex];
        return updated;
      });

      const interval = setInterval(() => {
        charIndex++;

        if (charIndex >= paragraph.length) {
          clearInterval(interval);
          return;
        }

        setTypedParagraphs((prev) => {
          const updated = [...prev];
          updated[pIndex] += paragraph[charIndex];
          return updated;
        });
      }, 30); // Adjust typing speed here
    });
  }, [isAboutVisible]);

  // Handle mouse movement for interactive effects
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="min-h-screen bg-gray-900 text-green-400"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Matrix */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.1)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-screen w-px bg-gradient-to-b from-transparent via-green-500/30 to-transparent"
              style={{
                left: `${i * 5}%`,
                animationDuration: `${2 + Math.random() * 2}s`,
                animationDelay: `${i * 0.1}s`,
                transform: 'translateY(-100%)',
                animation: 'dataStream 3s linear infinite'
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <Activity className="text-green-400" />
              <span className="text-2xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
                ALLY.MATRIX
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {['SERVICES', 'ABOUT', 'PROJECTS', 'CONTACT'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-mono text-sm tracking-wider hover:text-green-300 transition-colors relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              {!mobileMenuOpen ? (
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open Menu"
                  className="text-green-400 hover:text-green-300"
                >
                  <Menu />
                </button>
              ) : (
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="text-green-400 hover:text-green-300"
                >
                  <X />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900/90 border-t border-green-500/20">
            <div className="flex flex-col space-y-4 px-4 py-4 font-mono">
              {['SERVICES', 'ABOUT', 'PROJECTS', 'CONTACT'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm tracking-wider hover:text-green-300 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Subtle Grid BG */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4 opacity-10">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="border border-green-500/20"
              style={{
                animation: `pulse ${2 + Math.random() * 2}s infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-7xl font-bold mb-8 font-mono relative">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              Ally Digital Agency
            </span>
            <br />
            <span className="inline-block">
              AI-Powered Solutions for Your Growth
            </span>
          </h1>

          <p className="text-lg md:text-xl text-green-300/80 mb-12 max-w-3xl mx-auto font-mono">
            We transform your ideas into dynamic digital solutions. With creativity, technology,
            and AI-driven insights, we deliver results that set your brand apart.
          </p>

          <div className="flex justify-center gap-6">
            <button
              className="px-8 py-3 bg-green-500 text-gray-900 font-mono hover:bg-green-400 transition-colors relative group overflow-hidden"
              onClick={() => setIsInitializing(true)}
            >
              <span className="relative z-10">Initialize System</span>
              <span className="absolute inset-0 bg-green-300 transform -translate-x-full group-hover:translate-x-0 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Initialize System Overlay */}
      {isInitializing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90">
          <div className="text-center text-green-400 space-y-4 font-mono p-6 border border-green-500/30 bg-gray-900/80 max-w-sm w-full">
            {/* Title */}
            {!showSuccessMsg && (
              <p className="text-lg">Initializing AI System...</p>
            )}

            {/* Boot lines */}
            {!showSuccessMsg && (
              <div className="text-green-300 text-sm space-y-1">
                <p>• Loading neural cores...</p>
                <p>• Activating quantum dev environment...</p>
                <p>• Establishing data matrix...</p>
              </div>
            )}

            {/* Progress bar */}
            {!showSuccessMsg && (
              <div className="w-full bg-green-800 mt-4 h-2 rounded relative overflow-hidden">
                <div
                  className="absolute bg-green-400 h-2 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Success message (appears once progress hits 100) */}
            {showSuccessMsg && (
              <p className="text-xl text-green-400 font-bold">
                Initialized Successfully!
              </p>
            )}
          </div>
        </div>
      )}

      {/* ABOUT Section with Typewriter Effect */}
      <section id="about" ref={aboutRef} className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-8 text-center">
            ABOUT.ALLY
            <span className="block text-sm text-green-500/60 mt-2">
              // who we are
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column: typed paragraphs */}
            <div>
              {typedParagraphs.map((typedText, index) => (
                <p
                  key={index}
                  className="text-green-300/80 mb-4 text-base md:text-lg leading-relaxed"
                >
                  {typedText}
                </p>
              ))}
            </div>

            {/* Right column: Mission, Vision, What Sets Us Apart */}
            <div className="space-y-6">
              <div className="border border-green-500/30 p-4 bg-gray-900/60">
                <h3 className="font-mono text-lg font-bold mb-2">Our Mission</h3>
                <p className="text-green-300/80 text-sm md:text-base leading-relaxed">
                  To empower businesses with innovative, AI-powered digital solutions that drive growth,
                  foster connections, and deliver measurable results.
                </p>
              </div>

              <div className="border border-green-500/30 p-4 bg-gray-900/60">
                <h3 className="font-mono text-lg font-bold mb-2">Our Vision</h3>
                <p className="text-green-300/80 text-sm md:text-base leading-relaxed">
                  To be the leading digital agency known for integrating advanced AI capabilities
                  with creative strategies, redefining how businesses engage their audiences and optimize operations.
                </p>
              </div>

              <div className="border border-green-500/30 p-4 bg-gray-900/60">
                <h3 className="font-mono text-lg font-bold mb-2">What Sets Us Apart</h3>
                <ul className="list-disc list-inside text-green-300/80 space-y-1 text-sm md:text-base">
                  <li>AI-Driven Innovation</li>
                  <li>Tailored Strategies</li>
                  <li>Results-Oriented Mindset</li>
                  <li>Collaborative Approach</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
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
              <Link
                key={index}
                to={service.link}
                className="relative group"
                onMouseEnter={() => setActiveNode(index)}
                onMouseLeave={() => setActiveNode(null)}
              >
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

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-mono font-bold mb-12 text-center">
            PROJECTS.MATRIX
            <span className="block text-sm text-green-500/60 mt-2">
              // Showcasing Solutions
            </span>
          </h2>

          {/* Example Projects */}
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((proj, i) => (
              <div
                key={i}
                className="border border-green-500/30 p-6 bg-gray-900/80 relative"
              >
                <h3 className="text-xl font-mono font-bold mb-3 text-green-400">
                  {proj.title}
                </h3>
                <p className="text-green-300/80 mb-4">{proj.description}</p>
                <p className="text-green-500/80 font-mono text-sm">
                  <span className="font-bold">Result: </span>
                  {proj.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Visualization Stats Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-green-900/20" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group relative">
                <div className="absolute inset-0 bg-green-500/5 transform -skew-y-6" />
                <div className="relative p-6">
                  <div className="mb-4 w-16 h-16 mx-auto bg-green-500/10 rounded-lg flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-mono font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-green-400/60 font-mono text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Matrix */}
      <section id="contact" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent" />
              <div className="relative border border-green-500/30 p-8">
                <h3 className="text-xl font-mono font-bold mb-6">
                  Network.Connect
                </h3>
                <form className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter.Name"
                      className="w-full bg-transparent border border-green-500/30 px-4 py-3 text-green-400 placeholder-green-500/50 focus:border-green-400 transition-colors font-mono"
                    />
                    <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter.Email"
                      className="w-full bg-transparent border border-green-500/30 px-4 py-3 text-green-400 placeholder-green-500/50 focus:border-green-400 transition-colors font-mono"
                    />
                    <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <textarea
                      rows="4"
                      placeholder="Enter.Message"
                      className="w-full bg-transparent border border-green-500/30 px-4 py-3 text-green-400 placeholder-green-500/50 focus:border-green-400 transition-colors font-mono"
                    ></textarea>
                    <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-green-500 text-gray-900 font-mono hover:bg-green-400 transition-colors"
                  >
                    Transmit.Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent" />
                <div className="relative border border-green-500/30 p-6">
                  <h4 className="font-mono text-lg mb-4">Location.Data</h4>
                  <div className="space-y-4 text-green-300/80">
                    <div className="flex items-center space-x-4">
                      <Code className="text-green-400" />
                      <span>123 Innovation Lane, Creative City, USA</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Binary className="text-green-400" />
                      <span>hello@allydigitalagency.com</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Network className="text-green-400" />
                      <span>+1 234 567 890</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-green-300/80 font-mono">
                <p>We can’t wait to discuss your next big idea.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Matrix */}
      <footer className="relative py-12 border-t border-green-500/20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Activity className="text-green-400" />
                <span className="text-xl font-mono font-bold text-green-400">
                  ALLY.MATRIX
                </span>
              </div>
              <p className="text-green-300/80">
                Empowering Ideas with AI-Driven Digital Solutions
              </p>
            </div>

            {[
              {
                title: 'SERVICES',
                links: [
                  'AI.SOLUTIONS',
                  'WEB.DEVELOPMENT',
                  'DIGITAL.MARKETING',
                  'DATA.ANALYTICS'
                ]
              },
              {
                title: 'INDUSTRIES',
                links: [
                  'E.COMMERCE',
                  'HEALTHCARE',
                  'EDUCATION',
                  'TECH.STARTUPS'
                ]
              },
              {
                title: 'RESOURCES',
                links: ['CASE.STUDIES', 'AI.INSIGHTS', 'TECH.BLOG', 'API.DOCS']
              }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-mono font-bold mb-6">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-green-300/80 hover:text-green-400 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-green-500/20 mt-12 pt-8 text-center text-green-300/80">
            <p className="font-mono">
              &copy; {new Date().getFullYear()} ALLY.MATRIX // ALL.RIGHTS.RESERVED
            </p>
          </div>
        </div>
      </footer>

      {/* Global styles for animations */}
      <style jsx global>{`
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
  );
};

/**
 * SERVICES DATA
 */
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

/**
 * PROJECTS DATA
 */
const projects = [
  {
    title: "AI-Driven E-commerce",
    description:
      "Implemented an AI-powered recommendation engine for a boutique fashion retailer, boosting sales by 80%.",
    result: "Significant increase in conversion rates & brand loyalty."
  },
  {
    title: "Predictive Analytics in Healthcare",
    description:
      "Deployed an AI chatbot for a healthcare provider, reducing response times by 80% and enhancing patient engagement by 50%.",
    result: "Greater patient satisfaction & optimized scheduling."
  },
  {
    title: "NLP-Enhanced Marketing Campaign",
    description:
      "Leveraged Natural Language Processing to create personalized email campaigns, improving open rates by 40%.",
    result: "Targeted outreach & increased ROI from email marketing."
  },
  {
    title: "Automated Social Media Management",
    description:
      "Developed an AI scheduling and sentiment analysis tool for social channels, leading to a 60% surge in engagement.",
    result: "Unified brand voice & higher audience interaction."
  }
];

/**
 * STATS DATA
 */
const stats = [
  {
    icon: <BarChart className="text-green-400" size={24} />,
    value: "100+",
    label: "PROJECTS.EXECUTED"
  },
  {
    icon: <Brain className="text-green-400" size={24} />,
    value: "50+",
    label: "AI.IMPLEMENTATIONS"
  },
  {
    icon: <Network className="text-green-400" size={24} />,
    value: "200+",
    label: "CLIENTS.CONNECTED"
  },
  {
    icon: <Activity className="text-green-400" size={24} />,
    value: "99.9%",
    label: "SYSTEM.UPTIME"
  }
];

export default DataMatrixLanding;
