import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SubServiceItem = ({ service, index, activeIndex, setActiveIndex }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Ekran ölçüsünü yoxlayırıq: mobile üçün fərqli davranış
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isActive = activeIndex === index;

  // Hover effektləri yalnız mobile xaricində işləsin
  const handleMouseEnter = () => {
    if (!isMobile) setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setActiveIndex(null);
  };

  // Mobile-da kliklə açılıb-bağlanma
  const handleClick = () => {
    if (isMobile) setActiveIndex(isActive ? null : index);
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      layoutId={`service-${index}`} // layoutId sintaksis xətası düzəldildi
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="border border-green-500/30 bg-gray-900/80 p-6 relative overflow-hidden"
        layout
        initial={{ borderRadius: 12 }}
        animate={{
          scale: isActive ? 1.05 : 1,
          boxShadow: isActive ? "0px 6px 30px rgba(16, 185, 129, 0.6)" : "none",
          background: isActive
            ? "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))"
            : "rgba(17, 24, 39, 0.8)",
          // Əgər hər hansı başqa subservice aktivdirsə, cari kartı yumşaq qaraltmaq:
          filter: !isActive && activeIndex !== null ? "brightness(0.7)" : "brightness(1)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
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
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96], // daha yumşaq animasiya
                delay: 0.1, // daha incə görünüş üçün kiçik gecikmə
              }}
            >
              <p className="text-green-200 text-sm leading-relaxed">
                {service.fullDescription ||
                  "Xidmət haqqında əlavə məlumatlar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default SubServiceItem;
