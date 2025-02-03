// src/components/InitializeSystemOverlay.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const InitializeSystemOverlay = ({ onComplete }) => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const canvasRef = useRef(null);

  // Matrix Rain Effect: Create a canvas-based digital rain background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Function to set the canvas size to fill the viewport
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
      // Fade effect for the background to create trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        // Randomly reset drop to top when it goes off screen
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
        className="absolute inset-0"
        style={{ background: 'black' }}
      />

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 p-6 border border-green-500/30 bg-black bg-opacity-80 max-w-xs w-full">
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
    </motion.div>
  );
};

export default InitializeSystemOverlay;
