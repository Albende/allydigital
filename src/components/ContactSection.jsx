// src/components/ContactSection.jsx
import React from 'react';
import { Code, Binary, Network } from 'lucide-react';

const ContactSection = () => {
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
              <form className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter.Name"
                    className="w-full bg-transparent border border-green-500/30 px-4 py-3 text-green-400 placeholder-green-500/50 focus:border-green-400 transition-colors font-mono"
                  />
                  <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter.Email"
                    className="w-full bg-transparent border border-green-500/30 px-4 py-3 text-green-400 placeholder-green-500/50 focus:border-green-400 transition-colors font-mono"
                  />
                  <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                </div>
                <div className="relative">
                  <textarea
                    rows="4"
                    placeholder="Enter.Message"
                    className="w-full bg-transparent border border-green-500/30 px-4 py-3 text-green-400 placeholder-green-500/50 focus:border-green-400 transition-colors font-mono"
                  ></textarea>
                  <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-green-500 text-gray-900 font-mono hover:bg-green-400 transition-colors"
                >
                  Transmit.Message
                </button>
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
