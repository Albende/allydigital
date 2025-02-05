// src/components/ContactSection.jsx
import React, { useState } from "react";
import { Code, Binary, Network } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  // Handle form field changes
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
    <section id="contact" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent" />
            <div className="relative border border-green-500/30 p-8">
              <h3 className="text-xl font-mono font-bold mb-6">
                Network.Connect
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter.Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-green-500/30 px-4 py-3 text-green-400 placeholder-green-500/50 focus:border-green-400 transition-colors font-mono"
                    required
                  />
                  <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter.Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-green-500/30 px-4 py-3 text-green-400 placeholder-green-500/50 focus:border-green-400 transition-colors font-mono"
                    required
                  />
                  <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                </div>
                <div className="relative">
                  <textarea
                    rows="4"
                    name="message"
                    placeholder="Enter.Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-green-500/30 px-4 py-3 text-green-400 placeholder-green-500/50 focus:border-green-400 transition-colors font-mono"
                    required
                  ></textarea>
                  <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-green-500 text-gray-900 font-mono hover:bg-green-400 transition-colors"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Transmit.Message"}
                </button>
                {status && status !== "sending" && (
                  <p className="mt-2 text-sm text-green-300">
                    {status === "success"
                      ? "Message sent successfully!"
                      : status}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent" />
              <div className="relative border border-green-500/30 p-6">
                <h4 className="font-mono text-lg mb-4">Location.Data</h4>
                <div className="space-y-4 text-green-300/80">
                  <div className="flex items-center space-x-4">
                    <Code className="text-green-400" />
                    <span>123 Innovation Lane, Creative City, USA</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Binary className="text-green-400" />
                    <span>hello@aiorbis.tech</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Network className="text-green-400" />
                    <span>+1 234 567 890</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-green-300/80 font-mono">
              <p>We can’t wait to discuss your next big idea.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
