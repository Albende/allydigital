// src/components/StatsSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import { BarChart, Brain, Network, Activity } from 'lucide-react';

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
    value: "99%",
    label: "SYSTEM.UPTIME"
  }
];

const StatsSection = () => {
  const statsRef = useRef(null);
  const [areStatsVisible, setAreStatsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAreStatsVisible(true);
          observer.unobserve(statsRef.current);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!areStatsVisible) return;
    const numericTargets = stats.map(stat => {
      const numeric = parseFloat(stat.value.replace(/[^\d.]/g, "")) || 0;
      return numeric;
    });
    const incrementSpeed = 20;
    const step = 1;
    const interval = setInterval(() => {
      setCounts(prev => {
        let allDone = true;
        const next = prev.map((count, i) => {
          const target = numericTargets[i];
          const isDecimal = String(target).includes(".");
          const floatStep = isDecimal ? 0.1 : step;
          if (count < target) {
            allDone = false;
            const incremented = count + floatStep;
            return incremented >= target ? target : parseFloat(incremented.toFixed(1));
          }
          return count;
        });
        if (allDone) clearInterval(interval);
        return next;
      });
    }, incrementSpeed);
    return () => clearInterval(interval);
  }, [areStatsVisible]);

  return (
    <section ref={statsRef} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-green-900/20" />
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid gap-8 md:grid-cols-4">
          {stats.map((stat, index) => {
            const suffix = stat.value.replace(/[\d.]/g, "");
            return (
              <div key={index} className="text-center group relative">
                <div className="absolute inset-0 bg-green-500/5 transform -skew-y-6" />
                <div className="relative p-6">
                  <div className="mb-4 w-16 h-16 mx-auto bg-green-500/10 rounded-lg flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-mono font-bold mb-2">
                    {counts[index]}{suffix}
                  </div>
                  <div className="text-green-400/60 font-mono text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
