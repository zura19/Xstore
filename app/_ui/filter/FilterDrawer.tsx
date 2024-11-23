import React, { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterDrawer({ children }: { children: ReactNode }) {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  // const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleScroll = () => {
    // setIsScrolling(true); // Mark as scrolling
    setIsButtonVisible(false); // Hide the button while scrolling

    // Clear any previous timeout to avoid overlapping
    if (scrollTimeout) clearTimeout(scrollTimeout);

    // Check visibility when scrolling stops
    const timeout = setTimeout(() => {
      // setIsScrolling(false); // Scrolling has stopped
      const footer = document.getElementById("footer");
      const container = document.getElementById("scrollable-content");

      if (footer && container) {
        const footerRect = footer.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Check if the footer is visible
        const isFooterVisible = footerRect.top < containerRect.bottom;

        // Button should be visible only if the footer is not visible
        setIsButtonVisible(!isFooterVisible);
      } else {
        setIsButtonVisible(true); // Default to visible if no footer or container
      }
    }, 500); // Adjust delay as needed

    setScrollTimeout(timeout);
  };

  useEffect(() => {
    const container = document.getElementById("scrollable-content");
    if (container) {
      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      };
    }
  }, [scrollTimeout]);

  return (
    <div className="drawer bg-none z-50 ">
      <input id="filter" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <AnimatePresence>
          {isButtonVisible && (
            <motion.label
              onClick={() => setIsButtonVisible(false)}
              htmlFor="filter"
              id="filter-btn"
              className="btn hover:bg-indigo-700 btn-sm  fixed bg-indigo-600 border-none bottom-[70px] shadow-md left-28 right-28  rounded-full text-sm bg-none   btn-primary drawer-button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
            >
              Filter
            </motion.label>
          )}
        </AnimatePresence>
      </div>
      <div className="drawer-side">
        <label
          onClick={() => setIsButtonVisible(true)}
          htmlFor="filter"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu  text-base-content min-h-full w-64 bg-white p-4">
          {children}
        </ul>
      </div>
    </div>
  );
}
