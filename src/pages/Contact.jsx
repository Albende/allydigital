// src/pages/Contact.jsx
import React, { useState } from "react";
import { MapPin, Mail, Phone, Send, Zap } from "lucide-react";
import NavBar from "../components/NavBar";
import AnimatedBackground from "../components/AnimatedBackground";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  // Update state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(`error: ${result.error}`);
      }
    } catch (error) {
      setStatus(`error: ${error.toString()}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-green-400 flex flex-col">
      <AnimatedBackground />
      <div className="relative z-20">
        <NavBar />
        {/* Hero Section with Futuristic Background */}
        <section className="relative flex items-center justify-center py-24 px-4 overflow-hidden">
          {/* Pulsating radial gradient */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(0,255,128,0.05)_0%,_transparent_70%)]" />
          {/* Animated data streams */}
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-px bg-gradient-to-b from-transparent via-green-500/40 to-transparent"
                style={{
                  left: `${i * 6}%`,
                  animation: "dataStream 6s linear infinite",
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Futuristic glitch-style heading */}
            <h1 className="text-4xl md:text-6xl font-bold font-mono relative text-green-300/90 leading-snug glitch-effect">
              GET.IN.TOUCH
            </h1>
            <p className="text-green-300/60 mt-4 mb-6 font-mono">
              We’re ready to connect. Let’s bring your ideas to life in the{" "}
              <strong>AIORBIS.TECH</strong>.
            </p>
            {/* Quick CTA button */}
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-gray-900 font-mono text-sm tracking-wider hover:bg-green-400 transition-colors"
            >
              <Zap size={18} />
              Engage
            </a>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section id="contact-form" className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="relative z-10">
              <div className="text-2xl md:text-3xl font-bold font-mono mb-6">
                TRANSMIT.MESSAGE
              </div>
              <form className="space-y-6 font-mono" onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="ENTER.NAME"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-green-500/30 px-4 py-3 text-green-400 placeholder-green-500/50 focus:border-green-400 transition-colors"
                    required
                  />
                  <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="ENTER.EMAIL"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-green-500/30 px-4 py-3 text-green-400 placeholder-green-500/50 focus:border-green-400 transition-colors"
                    required
                  />
                  <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                </div>
                <div className="relative">
                  <textarea
                    rows="5"
                    name="message"
                    placeholder="ENTER.MESSAGE"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-green-500/30 px-4 py-3 text-green-400 placeholder-green-500/50 focus:border-green-400 transition-colors"
                    required
                  ></textarea>
                  <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="relative inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-gray-900 hover:bg-green-400 transition-colors font-bold"
                  disabled={status === "sending"}
                >
                  <Send size={18} />
                  {status === "sending" ? "Sending..." : "SEND"}
                </button>
                {status && status !== "sending" && (
                  <p className="mt-2 text-sm text-green-300">
                    {status === "success" ? "Message sent successfully!" : status}
                  </p>
                )}
              </form>
            </div>

            {/* Contact Info / Location */}
            <div className="text-green-300/80 space-y-8">
              <div>
                <h3 className="text-xl font-mono font-bold mb-2">
                  LOCATION.DATA
                </h3>
                <p className="flex items-center gap-2">
                  <MapPin size={18} className="text-green-400" />
                  123 Innovation Lane, Creative City, USA
                </p>
              </div>
              <div>
                <h3 className="text-xl font-mono font-bold mb-2">
                  DIRECT.CONTACT
                </h3>
                <p className="flex items-center gap-2">
                  <Mail size={18} className="text-green-400" />
                  hello@aiorbis.tech
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={18} className="text-green-400" />
                  +1 234 567 890
                </p>
              </div>
              <div>
                <h3 className="text-xl font-mono font-bold mb-2">
                  HOURS.OF.OPERATION
                </h3>
                <p>Mon - Fri: 8:00 - 19:00 (ET)</p>
                <p>Sat - Sun: By Appointment</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-green-500/20 py-8 text-center">
          <p className="text-green-300/80 font-mono">
            &copy; {new Date().getFullYear()} AIORBIS.TECH // CONTACT.US
          </p>
        </footer>
      </div>
      <style jsx global>{`
        @keyframes dataStream {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .glitch-effect {
          position: relative;
          display: inline-block;
        }
        .glitch-effect::before,
        .glitch-effect::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          width: 100%;
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
        }
        .glitch-effect::before {
          left: 2px;
          text-shadow: -1px 0 red;
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }
        .glitch-effect::after {
          left: -2px;
          text-shadow: -1px 0 blue;
          animation: glitch-anim2 2s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% {
            clip: rect(20px, 9999px, 40px, 0);
          }
          10% {
            clip: rect(64px, 9999px, 90px, 0);
          }
          20% {
            clip: rect(20px, 9999px, 30px, 0);
          }
          30% {
            clip: rect(60px, 9999px, 90px, 0);
          }
          40% {
            clip: rect(40px, 9999px, 60px, 0);
          }
          50% {
            clip: rect(20px, 9999px, 80px, 0);
          }
          60% {
            clip: rect(50px, 9999px, 70px, 0);
          }
          70% {
            clip: rect(80px, 9999px, 100px, 0);
          }
          80% {
            clip: rect(60px, 9999px, 70px, 0);
          }
          90% {
            clip: rect(30px, 9999px, 50px, 0);
          }
          100% {
            clip: rect(60px, 9999px, 80px, 0);
          }
        }
        @keyframes glitch-anim2 {
          0% {
            clip: rect(60px, 9999px, 90px, 0);
          }
          10% {
            clip: rect(30px, 9999px, 60px, 0);
          }
          20% {
            clip: rect(40px, 9999px, 50px, 0);
          }
          30% {
            clip: rect(20px, 9999px, 90px, 0);
          }
          40% {
            clip: rect(60px, 9999px, 100px, 0);
          }
          50% {
            clip: rect(50px, 9999px, 70px, 0);
          }
          60% {
            clip: rect(90px, 9999px, 120px, 0);
          }
          70% {
            clip: rect(40px, 9999px, 60px, 0);
          }
          80% {
            clip: rect(10px, 9999px, 70px, 0);
          }
          90% {
            clip: rect(80px, 9999px, 100px, 0);
          }
          100% {
            clip: rect(40px, 9999px, 60px, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
