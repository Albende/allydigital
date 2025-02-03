// src/components/SplashScreen.jsx
import React, { useEffect, useRef, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
  const canvasRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Matrix rain canvas effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Make canvas responsive
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(0);

    let glitchStart = null;
    const glitchDuration = 2000; // 2 seconds for smoother fade-out

    const draw = (timestamp) => {
      if (fadeOut) {
        if (!glitchStart) glitchStart = timestamp;
        const progress = Math.min(1, (timestamp - glitchStart) / glitchDuration);
        // Gradually increase overlay opacity during glitch phase
        const overlayAlpha = 0.05 + progress * 0.25;
        ctx.fillStyle = `rgba(0, 0, 0, ${overlayAlpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          // Introduce horizontal offset that grows with progress for the glitch effect
          const offset = progress * ((Math.random() - 0.5) * 10);
          // Interpolate from bright green to a slightly muted tone
          const startGreen = 255;
          const targetGreen = 200 + Math.random() * 55;
          const greenValue = Math.floor(startGreen - progress * (startGreen - targetGreen));
          ctx.fillStyle = `rgb(0, ${greenValue}, 0)`;
          ctx.fillText(text, i * fontSize + offset, drops[i] * fontSize);
          drops[i] += 1 + progress * 1.5;
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
        }
      } else {
        // Normal matrix rain drawing
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
      }
      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
    return () => window.removeEventListener('resize', setCanvasSize);
  }, [fadeOut]);

  // Trigger fade-out (glitch) phase after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 2000); // match glitchDuration
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  // Add mouse move listener for ripple and gradient effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Create a ripple at the current mouse position
      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);

      // Update CSS variables for the radial gradient
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'black' }}
      />

      {/* Animated mouse effects layer */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Radial gradient that follows the mouse */}
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

      {/* Text content */}
      <div
        className={`relative z-20 text-center transition-all duration-500 ${
          fadeOut ? 'animate-glitch text-green-500' : 'text-green-400'
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-mono mb-4">Welcome to AIOrbis</h1>
        <p className="text-lg md:text-2xl">Initializing digital matrix...</p>
      </div>

      {/* Combined CSS keyframes */}
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

export default SplashScreen;
