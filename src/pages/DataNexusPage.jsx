import React, { useState } from "react";
import { Database, BarChart4, Layers, PieChart, Package } from "lucide-react";
import NavBar from "../components/NavBar";
import AnimatedBackground from "../components/AnimatedBackground";
import SubServiceItem from "../components/SubServiceItem";

const DataNexusPage = () => {
  const [activeCard, setActiveCard] = useState(null);

  const subServices = [
    {
      title: "Neural Behavior Analysis",
      description:
        "Interpret user behaviors in real-time with AI-driven segmentation, tracking unique patterns of engagement.",
      icon: <Layers size={24} className="text-green-400" />,
      fullDescription:
        "Neural Behavior Analysis interprets user behavior in real time using advanced segmentation techniques. By tracking unique engagement patterns, it provides insights that empower businesses to tailor their strategies and optimize user interactions.",
    },
    {
      title: "Advanced Analytics Matrix",
      description:
        "Dashboards that harness deep learning algorithms to detect hidden correlations and outliers.",
      icon: <BarChart4 size={24} className="text-green-400" />,
      fullDescription:
        "The Advanced Analytics Matrix brings deep learning to your data dashboards. By detecting hidden correlations and identifying outliers, it transforms raw data into actionable insights, driving smarter business decisions.",
    },
    {
      title: "Predictive Insights Engine",
      description:
        "Use predictive modeling to forecast trends, empowering data-backed decisions across your organization.",
      icon: <PieChart size={24} className="text-green-400" />,
      fullDescription:
        "Our Predictive Insights Engine employs cutting-edge predictive models to forecast future trends. It delivers data-backed insights that enable organizations to plan strategically and adapt to evolving market dynamics.",
    },
    {
      title: "KPI Neural Networks",
      description:
        "Customizable neural nets to track, optimize, and adapt your key performance indicators in real-time.",
      icon: <Package size={24} className="text-green-400" />,
      fullDescription:
        "KPI Neural Networks provide a customizable solution for tracking and optimizing your key performance indicators. Leveraging neural network technology, it adapts in real time to ensure your business metrics are always on target.",
    },
    {
      title: "Conversion Optimization AI",
      description:
        "Pinpoint the user journey bottlenecks and enhance conversion funnels with dynamic suggestions.",
      icon: <Database size={24} className="text-green-400" />,
      fullDescription:
        "Conversion Optimization AI pinpoints bottlenecks in the user journey and offers dynamic suggestions to enhance your conversion funnels. With its real-time analysis, it helps transform user interactions into measurable results.",
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
              <Database size={48} className="text-green-400 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold font-mono">
                DATA.NEXUS
              </h1>
            </div>
            <p className="text-green-300/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Experience a comprehensive data ecosystem built on AI insights.
              Unify and analyze your information streams for smarter, faster decision-making.
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
            &copy; {new Date().getFullYear()} AIORBIS.TECH // DATA.NEXUS
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DataNexusPage;
