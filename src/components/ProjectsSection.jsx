// src/components/ProjectsSection.jsx
import React from 'react';

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

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-mono font-bold mb-12 text-center">
          PROJECTS.MATRIX
          <span className="block text-sm text-green-500/60 mt-2">
            // Showcasing Solutions
          </span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((proj, i) => (
            <div key={i} className="border border-green-500/30 p-6 bg-gray-900/80 relative">
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
  );
};

export default ProjectsSection;
