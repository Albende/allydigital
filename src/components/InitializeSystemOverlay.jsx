// src/components/InitializeSystemOverlay.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const InitializeSystemOverlay = ({ onComplete }) => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [ripples, setRipples] = useState([]);
  const canvasRef = useRef(null);

  // Matrix Rain Effect: Create a canvas-based digital rain background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size to fill the viewport
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Matrix settings
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    const drawMatrix = () => {
      // Fade effect to create trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(drawMatrix);
    };

    drawMatrix();
    return () => window.removeEventListener('resize', setCanvasSize);
  }, []);

  // Circular progress indicator parameters
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  // Add mousemove listener for ripple and gradient effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Create a new ripple at the mouse position
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

  // Remove each ripple after its 1-second animation completes
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [ripples]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={fadeOut ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1 }}
      onAnimationComplete={() => {
        if (fadeOut && onComplete) onComplete();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Matrix digital rain background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'black' }}
      />

      {/* Animated mouse effects layer */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Radial gradient following the mouse */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,255,128,0.1) 0%, transparent 70%)',
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
                animation: 'dataStream 3s linear infinite',
              }}
            />
          ))}
        </div>
        {/* Mouse-triggered ripples */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full bg-green-500 opacity-70 animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: '20px',
              height: '20px',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Overlay content */}
      <div className="relative z-20 flex flex-col items-center justify-center space-y-6 p-6 border border-green-500/30 bg-black bg-opacity-80 max-w-xs w-full">
        {!showSuccessMsg ? (
          <>
            <p className="text-lg text-green-400 font-mono">
              Initializing AI System...
            </p>
            {/* Animated circular progress indicator */}
            <motion.svg
              width="120"
              height="120"
              className="transform -rotate-90"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 4, ease: 'easeInOut' }}
              onAnimationComplete={() => {
                setShowSuccessMsg(true);
                // Wait 1 second to show the success message before fading out
                setTimeout(() => {
                  setFadeOut(true);
                }, 1000);
              }}
            >
              <motion.circle
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke="#0F0"
                strokeWidth="8"
                strokeDasharray={circumference}
              />
            </motion.svg>
            <div className="text-green-300 text-sm font-mono">
              <p>• Loading neural cores...</p>
              <p>• Activating quantum dev environment...</p>
              <p>• Establishing data matrix...</p>
            </div>
          </>
        ) : (
          <p className="text-xl text-green-400 font-bold font-mono">
            Initialized Successfully!
          </p>
        )}
      </div>

      {/* CSS keyframes for data streams and ripples */}
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
    </motion.div>
  );
};

export default InitializeSystemOverlay;
