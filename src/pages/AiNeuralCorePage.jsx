import React from 'react';
import { Brain, Activity, Monitor, Cpu, Search, Zap } from 'lucide-react';
import NavBar from '../components/NavBar';

const AiNeuralCorePage = () => {
  // Sub-services data for this page (5 items)
  const subServices = [
    {
      title: "Predictive Behavior Analyzer",
      description:
        "Utilize advanced machine learning models to anticipate user behaviors and trends, enabling proactive engagement strategies.",
      icon: <Search size={24} className="text-green-400" />
    },
    {
      title: "Cognitive Vision System",
      description:
        "Ingest and interpret image/video data for real-time insights, anomaly detection, and intelligent content tagging.",
      icon: <Monitor size={24} className="text-green-400" />
    },
    {
      title: "Neural Language Processing",
      description:
        "Deploy custom NLP pipelines to power chatbots, content analysis, and sentiment detection across multiple languages.",
      icon: <Brain size={24} className="text-green-400" />
    },
    {
      title: "Automated Decision Engine",
      description:
        "Leverage AI-driven logic to streamline complex business decisions, reducing human error and speeding up workflows.",
      icon: <Cpu size={24} className="text-green-400" />
    },
    {
      title: "AI-Powered Recommendation",
      description:
        "Deliver product, content, or service recommendations in real-time, tailored uniquely to each user's profile.",
      icon: <Zap size={24} className="text-green-400" />
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-green-400">
              <NavBar />
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-20 px-4">
        {/* Title & Hero Content */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Brain size={48} className="text-green-400 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-mono">
              AI.NEURAL.CORE
            </h1>
          </div>
          <p className="text-green-300/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Unlock advanced machine intelligence with our suite of AI-driven solutions—
            from predictive analytics to cognitive vision systems. Accelerate innovation
            and amplify efficiency using state-of-the-art neural cores tailored to your
            business needs.
          </p>
        </div>
      </section>

      {/* Sub-Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-mono font-bold mb-8 text-center">
            AI.NEURAL.CORE.SUB-SERVICES
            <span className="block text-sm text-green-500/60 mt-2">
              // specialized.capabilities
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

      {/* CTA / Summary Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-mono font-bold mb-6">
            Ready to Integrate AI?
          </h2>
          <p className="text-green-300/80 mb-8">
            Discover how our neural systems can revolutionize your business
            operations and enhance customer experiences. 
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-green-500 text-gray-900 font-mono hover:bg-green-400 transition-colors"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-500/20 py-8 text-center">
        <p className="text-green-300/80 font-mono">
          &copy; {new Date().getFullYear()} ALLY.MATRIX // AI.NEURAL.CORE
        </p>
      </footer>
    </div>
  );
};

export default AiNeuralCorePage;