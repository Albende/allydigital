// src/components/AboutSection.jsx
import React, { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
  const aboutRef = useRef(null);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [typedParagraphs, setTypedParagraphs] = useState(["", "", ""]);

  const aboutParagraphs = [
    "At AIOrbis Digital Agency, we transform your ideas into dynamic digital solutions. Whether you're a small business seeking growth, a tech startup scaling your innovations, or an enterprise optimizing operations, we empower your journey.",
    "We’re not just a service provider; we’re your orbis in the digital landscape. Our blend of creativity, technology, and AI-driven insights delivers results that set your brand apart.",
    "We’re passionate about staying ahead of the curve, ensuring our clients leverage the latest tools and strategies to excel in competitive markets."
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
          observer.unobserve(aboutRef.current);
        }
      },
      { threshold: 0.2 }
    );
    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAboutVisible) return;

    aboutParagraphs.forEach((paragraph, pIndex) => {
      let charIndex = 0;
      // Immediately set the first character
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
      }, 30);
    });
  }, [isAboutVisible]);

  return (
    <section id="about" ref={aboutRef} className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-mono font-bold mb-8 text-center">
          ABOUT.AIOrbis
          <span className="block text-sm text-green-500/60 mt-2">
            // who we are
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {typedParagraphs.map((text, index) => (
              <p
                key={index}
                className="text-green-300/80 mb-4 text-base md:text-lg leading-relaxed"
              >
                {text}
              </p>
            ))}
          </div>

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
  );
};

export default AboutSection;
