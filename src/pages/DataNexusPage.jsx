import React from 'react';
import { Database, BarChart4, Layers, PieChart, Package } from 'lucide-react';
import NavBar from '../components/NavBar';

const DataNexusPage = () => {
  const subServices = [
    {
      title: "Neural Behavior Analysis",
      description:
        "Interpret user behaviors in real-time with AI-driven segmentation, tracking unique patterns of engagement.",
      icon: <Layers size={24} className="text-green-400" />
    },
    {
      title: "Advanced Analytics Matrix",
      description:
        "Dashboards that harness deep learning algorithms to detect hidden correlations and outliers.",
      icon: <BarChart4 size={24} className="text-green-400" />
    },
    {
      title: "Predictive Insights Engine",
      description:
        "Use predictive modeling to forecast trends, empowering data-backed decisions across your organization.",
      icon: <PieChart size={24} className="text-green-400" />
    },
    {
      title: "KPI Neural Networks",
      description:
        "Customizable neural nets to track, optimize, and adapt your key performance indicators in real-time.",
      icon: <Package size={24} className="text-green-400" />
    },
    {
      title: "Conversion Optimization AI",
      description:
        "Pinpoint the user journey bottlenecks and enhance conversion funnels with dynamic suggestions.",
      icon: <Database size={24} className="text-green-400" />
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-green-400">
                      <NavBar />
      {/* Hero */}
      <section className="flex flex-col items-center justify-center py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Database size={48} className="text-green-400 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-mono">
              DATA.NEXUS
            </h1>
          </div>
          <p className="text-green-300/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Experience a comprehensive data ecosystem built on AI insights.
            Unify and analyze your information streams for smarter, faster
            decision-making.
          </p>
        </div>
      </section>

      {/* Sub-services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-mono font-bold mb-8 text-center">
            DATA.NEXUS.SUB-SERVICES
            <span className="block text-sm text-green-500/60 mt-2">
              // unify.analyze.act
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
            Ready to Harness Your Data?
          </h2>
          <p className="text-green-300/80 mb-8">
            Empower your team with actionable insights and a seamless data pipeline.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-green-500 text-gray-900 font-mono hover:bg-green-400 transition-colors"
          >
            Start Analyzing
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-500/20 py-8 text-center">
        <p className="text-green-300/80 font-mono">
          &copy; {new Date().getFullYear()} ALLY.MATRIX // DATA.NEXUS
        </p>
      </footer>
    </div>
  );
};

export default DataNexusPage;
