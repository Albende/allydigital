// src/components/AnimatedBackground.jsx
import React, { useState, useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  // Ambient particles as numbers with gentle drift
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const numParticles = 50; // adjust this value for more/less numbers

    // Initialize particles with random position, drift, size, opacity, and a random digit
    const initParticles = (width, height) => {
      const parts = [];
      for (let i = 0; i < numParticles; i++) {
        const radius = Math.random() * 10 + 5; // used to determine font size
        parts.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius, // determines font size (e.g., font size = radius * 2)
          dx: (Math.random() - 0.5) * 0.4, // gentle horizontal drift
          dy: (Math.random() - 0.5) * 0.4, // gentle vertical drift
          alpha: Math.random() * 0.5 + 0.5, // opacity between 0.5 and 1
          digit: Math.floor(Math.random() * 10).toString(), // random digit 0-9
        });
      }
      return parts;
    };

    // Resize canvas and reinitialize particles
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = initParticles(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Update particle positions; reverse direction upon hitting canvas edges
    const updateParticles = () => {
      const width = canvas.width;
      const height = canvas.height;
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x > width || p.x < 0) p.dx = -p.dx;
        if (p.y > height || p.y < 0) p.dy = -p.dy;
      });
    };

    // Draw each particle as a softly glowing number
    const drawParticles = () => {
      // Clear the canvas and fill with black
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Set font size based on p.radius (e.g., twice the radius)
        const fontSize = p.radius * 2;
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Set fill style with the particle's opacity
        ctx.fillStyle = `rgba(0,255,128,${p.alpha})`;

        // Apply a shadow for a glow effect
        ctx.shadowColor = 'rgba(0,255,128,0.8)';
        ctx.shadowBlur = 10;

        // Draw the digit
        ctx.fillText(p.digit, p.x, p.y);
      });
    };

    let animationFrameId;
    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Mouse move effects: update gradient position and trigger ripple effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Create a new ripple at the current mouse position
      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);

      // Update CSS variables to reposition the radial gradient overlay
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
    <div className="fixed inset-0 pointer-events-none">
      {/* Canvas for ambient numbers with a slight blur */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: 'black',
          filter: 'blur(2px)',
        }}
      />

      {/* Mouse-triggered overlay */}
      <div className="absolute inset-0">
        {/* Radial gradient overlay that follows the mouse */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,255,128,0.05) 0%, transparent 70%)',
          }}
        />

        {/* Vertical animated data streams */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-screen w-px bg-gradient-to-b from-transparent via-green-500/20 to-transparent"
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
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Keyframes for animations */}
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
