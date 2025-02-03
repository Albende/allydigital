// src/components/SplashScreen.jsx
import React, { useEffect, useRef, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
  const canvasRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Ensure the canvas always matches the window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Matrix rain settings
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(0);
    
    // We'll use this to measure the glitch phase progress.
    let glitchStart = null;
    const glitchDuration = 1000; // 1 second glitch effect

    const draw = (timestamp) => {
      // If we are in glitch mode, measure elapsed time
      if (fadeOut && !glitchStart) {
        glitchStart = timestamp;
      }
      const elapsed = fadeOut ? timestamp - glitchStart : 0;
      
      if (!fadeOut) {
        // Normal digital rain effect
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
      } else {
        // Glitch cascade effect: gradually overlay with a more erratic, distorted effect
        // Instead of a white flash, we fade with a dark, turbulent overlay.
        const alpha = Math.max(0, 0.3 - (elapsed / glitchDuration) * 0.3);
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          // Random horizontal displacement for glitch effect
          const offset = (Math.random() - 0.5) * 10;
          // Choose a glitch color (darker neon green, with some variation)
          const greenValue = Math.floor(200 + Math.random() * 55);
          ctx.fillStyle = `rgb(0, ${greenValue}, 0)`;
          ctx.fillText(text, i * fontSize + offset, drops[i] * fontSize);
          // Make drop progression more erratic during glitch phase
          drops[i] += Math.random() * 1.5;
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
        }
      }
      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [fadeOut]);

  // Trigger the glitch/fade-out phase after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      // After the glitch phase, wait for its duration before finishing splash
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 1000); // glitch effect duration is 1 second
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <canvas ref={canvasRef} className="absolute inset-0" style={{ background: 'black' }} />
      <div className={`relative z-10 text-center transition-all duration-500 ${fadeOut ? 'animate-glitch text-green-500' : 'text-green-400'}`}>
        <h1 className="text-4xl md:text-6xl font-mono mb-4">
          Welcome to AIOrbis
        </h1>
        <p className="text-lg md:text-2xl">
          Initializing digital matrix...
        </p>
      </div>
      <style jsx>{`
        @keyframes glitch {
          0% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(-3px, 3px);
          }
          40% {
            transform: translate(3px, -3px);
          }
          60% {
            transform: translate(-3px, -3px);
          }
          80% {
            transform: translate(3px, 3px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        .animate-glitch {
          animation: glitch 0.3s infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
