import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

const SubServiceItem = ({ service, index, activeIndex, setActiveIndex }) => {
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  // This card is "active" if its index matches activeIndex
  const isActive = activeIndex === index;

  // 1) Determine if we're on mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 2) Measure the content height when opening. UseLayoutEffect = before paint
  useLayoutEffect(() => {
    if (contentRef.current && isActive) {
      // Only measure if active; store it in measuredHeight
      setMeasuredHeight(contentRef.current.scrollHeight);
    }
    // If it goes inactive, don’t immediately set to 0 here;
    // let Framer Motion handle going from measuredHeight → 0 in exit
  }, [isActive]);

  // 3) Mouse handlers for desktop
  const handleMouseEnter = () => {
    if (!isMobile) setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setActiveIndex(null);
  };

  // 4) Click handler for mobile
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
          // Scale or shadows only if not mobile
          scale: isActive && !isMobile ? 1.05 : 1,
          boxShadow:
            isActive && !isMobile
              ? "0px 6px 30px rgba(16, 185, 129, 0.6)"
              : "none",
          background: isActive
            ? "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))"
            : "rgba(17, 24, 39, 0.8)",
          filter:
            !isActive && activeIndex !== null
              ? "brightness(0.7)"
              : "brightness(1)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
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

        {/* 5) AnimatePresence for collapse/expand */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              className="mt-4 overflow-hidden"
              // for the "enter" animation
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: measuredHeight }}
              // for the "exit" animation
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
            >
              <div ref={contentRef}>
                <p className="text-green-200 text-sm leading-relaxed">
                  {service.fullDescription ||
                    "Xidmət haqqında əlavə məlumatlar..."}
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
