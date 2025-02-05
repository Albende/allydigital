// src/components/FooterSection.jsx
import React from "react";
import { Activity } from "lucide-react";

const FooterSection = () => {
  const sections = [
    {
      title: "SERVICES",
      links: [
        "AI.SOLUTIONS",
        "WEB.DEVELOPMENT",
        "DIGITAL.MARKETING",
        "DATA.ANALYTICS",
      ],
    },
    {
      title: "INDUSTRIES",
      links: ["E.COMMERCE", "HEALTHCARE", "EDUCATION", "TECH.STARTUPS"],
    },
    {
      title: "RESOURCES",
      links: ["CASE.STUDIES", "AI.INSIGHTS", "TECH.BLOG", "API.DOCS"],
    },
  ];

  return (
    <footer className="relative py-12 border-t border-green-500/20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Activity className="text-green-400" />
              <span className="text-xl font-mono font-bold text-green-400">
                AIORBIS.TECH
              </span>
            </div>
            <p className="text-green-300/80">
              Empowering Ideas with AI-Driven Digital Solutions
            </p>
          </div>
          {sections.map((section) => (
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
            &copy; {new Date().getFullYear()} AIORBIS.TECH //
            ALL.RIGHTS.RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
