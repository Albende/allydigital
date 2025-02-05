// src/components/AnimatedBackground.jsx
import React, { useState, useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Reduce the particle count if on a coarse pointer (mobile/tablet)
    const numParticles = isCoarsePointer ? 25 : 75;
    let particles = [];

    // === Initialize Particles ===
    const initParticles = (width, height) => {
      const newParticles = [];
      for (let i = 0; i < numParticles; i++) {
        const radius = Math.random() * 12 + 5; // used to determine font size
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          dx: (Math.random() - 0.5) * 0.3, // smooth drift
          dy: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.5 + 0.5, // 0.5 to 1
          digit: Math.floor(Math.random() * 10).toString(), // random digit
          lifetime: Math.random() * 200 + 100, // how long before digit changes
        });
      }
      return newParticles;
    };

    // === Resize Handler ===
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = initParticles(canvas.width, canvas.height);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // === Update Particles ===
    const updateParticles = () => {
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x > canvas.width || p.x < 0) p.dx = -p.dx;
        if (p.y > canvas.height || p.y < 0) p.dy = -p.dy;

        p.lifetime--;
        if (p.lifetime <= 0) {
          p.digit = Math.floor(Math.random() * 10).toString();
          p.lifetime = Math.random() * 200 + 100;
        }
      });
    };

    // === Draw Particles ===
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const fontSize = p.radius * 2;
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(0,255,128,${p.alpha})`;
        ctx.shadowColor = "rgba(0,255,128,0.8)";
        ctx.shadowBlur = 10;
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
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // === Handle Ripples (only on non-coarse pointer) ===
  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarsePointer) return; // Skip adding ripple events on mobile / coarse pointer

    const handleMouseMove = (e) => {
      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);

      const xPercent = ((e.clientX / window.innerWidth) * 100).toFixed(2);
      const yPercent = ((e.clientY / window.innerHeight) * 100).toFixed(2);
      document.documentElement.style.setProperty("--mouse-x", `${xPercent}%`);
      document.documentElement.style.setProperty("--mouse-y", `${yPercent}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // === Remove Oldest Ripple after 1200ms ===
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 1200);
    return () => clearTimeout(timer);
  }, [ripples]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Canvas with background and digits */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "black", filter: "blur(2px)" }}
      />

      {/* Overlays */}
      <div className="absolute inset-0">
        {/* Radial gradient that follows mouse – won't appear on mobile */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,255,128,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Vertical "data streams" */}
        <div className="absolute inset-0 opacity-25">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-screen w-px bg-gradient-to-b from-transparent via-green-500/20 to-transparent"
              style={{
                left: `${i * 4}%`,
                animationDuration: `${2 + Math.random() * 2}s`,
                animationDelay: `${i * 0.1}s`,
                transform: "translateY(-100%)",
                animation: "dataStream 4s linear infinite",
              }}
            />
          ))}
        </div>

        {/* Ripple circles (only on desktop pointer) */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full bg-green-500 opacity-70 animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "25px",
              height: "25px",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

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
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
