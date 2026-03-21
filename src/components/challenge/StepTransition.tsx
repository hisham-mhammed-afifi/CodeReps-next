"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface StepTransitionProps {
  stepKey: string;
  children: ReactNode;
  direction?: "forward" | "backward";
}

export function StepTransition({
  stepKey,
  children,
  direction = "forward",
}: StepTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div key={stepKey}>{children}</div>;
  }

  const xOffset = direction === "forward" ? 60 : -60;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={stepKey}
        initial={{ x: xOffset, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -xOffset, opacity: 0 }}
        transition={{
          x: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          opacity: { duration: 0.2, ease: "easeInOut" },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
