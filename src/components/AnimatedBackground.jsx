// src/components/AnimatedBackground.jsx
import React, { useState, useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);

  // Listen to mousemove events to trigger ripples and update gradient position
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Create a new ripple at the current mouse position
      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);

      // Update CSS variables to reposition the radial gradient
      const xPercent = ((e.clientX / window.innerWidth) * 100).toFixed(2);
      const yPercent = ((e.clientY / window.innerHeight) * 100).toFixed(2);
      document.documentElement.style.setProperty('--mouse-x', `${xPercent}%`);
      document.documentElement.style.setProperty('--mouse-y', `${yPercent}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Remove each ripple after its animation (1 second) completes
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [ripples]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Dynamic radial gradient background that follows the mouse */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,255,128,0.1) 0%, transparent 70%)'
        }}
      />

      {/* Vertical animated data streams */}
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

      {/* Mouse-triggered ripple effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full bg-green-500 opacity-70 animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Keyframes for the animations */}
      <style jsx>{`
        @keyframes dataStream {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.7;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
