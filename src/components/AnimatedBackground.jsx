import React from 'react';

const AnimatedBackground = () => {
  return (
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
  );
};

export default AnimatedBackground;
