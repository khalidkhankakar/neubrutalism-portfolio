import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  width = "fit-content",
  delay = 0,
  direction = "up"
}) => {
  const getVariants = () => {
    switch (direction) {
      case "up": return { hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } };
      case "down": return { hidden: { opacity: 0, y: -75 }, visible: { opacity: 1, y: 0 } };
      case "left": return { hidden: { opacity: 0, x: 75 }, visible: { opacity: 1, x: 0 } };
      case "right": return { hidden: { opacity: 0, x: -75 }, visible: { opacity: 1, x: 0 } };
      default: return { hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <div style={{ position: "relative", width, overflow: "visible" }}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};