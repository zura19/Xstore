"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi2";

const ScrollableContentWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const toggleVisibility = () => {
    const container = document.getElementById("scrollable-content");
    if (container && container.scrollTop > 300) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  };

  const scrollToTop = () => {
    const container = document.getElementById("scrollable-content");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = document.getElementById("scrollable-content");
    if (container) {
      container.addEventListener("scroll", toggleVisibility);
      return () => {
        container.removeEventListener("scroll", toggleVisibility);
      };
    }
  }, []);

  return (
    <div
      id="scrollable-content"
      className="overflow-scroll bg-background h-screen"
    >
      {children}

      <AnimatePresence>
        {isButtonVisible && (
          <motion.button
            className="fixed z-10  sm:bottom-5 sm:right-5  bottom-16 right-5  p-2.5 sm:p-3 cursor-pointer shadow-md text-base bg-primary text-white rounded-full"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiArrowUp size={20} color="#fff" strokeWidth={0.7} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollableContentWrapper;
