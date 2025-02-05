import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SubServiceItem = ({ service, index, activeIndex, setActiveIndex }) => {
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef(null);
  const isActive = activeIndex === index;
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isActive && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    } else {
      setContentHeight(0);
    }
  }, [isActive]);

  const handleMouseEnter = () => {
    if (!isMobile) setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setActiveIndex(null);
  };

  const handleClick = () => {
    if (isMobile) {
      setActiveIndex(isActive ? null : index);
    }
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="border border-green-500/30 bg-gray-900/80 p-6 relative overflow-hidden"
        initial={{ borderRadius: 12 }}
        animate={{
          scale: isActive && !isMobile ? 1.05 : 1, // scale on desktop only
          boxShadow: isActive ? "0px 6px 30px rgba(16, 185, 129, 0.6)" : "none",
          background: isActive
            ? "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))"
            : "rgba(17, 24, 39, 0.8)",
          filter: !isActive && activeIndex !== null ? "brightness(0.7)" : "brightness(1)",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        <div className="mb-4 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center transition-all duration-300">
          {service.icon}
        </div>
        <h3 className="text-xl font-mono font-bold mb-3 transition-all duration-300">
          {service.title}
        </h3>
        <p className="text-green-300/80 text-sm md:text-base leading-relaxed">
          {service.description}
        </p>

        <AnimatePresence>
          {isActive && (
            <motion.div
              className="mt-4 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: contentHeight }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
            >
              <div ref={contentRef}>
                <p className="text-green-200 text-sm leading-relaxed">
                  {service.fullDescription ||
                    "Xidmət haqqında əlavə məlumatlar. Lorem ipsum..."}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default SubServiceItem;
