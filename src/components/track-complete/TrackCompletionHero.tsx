"use client";

import { useEffect, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const BRAND_COLORS = ["#10B981", "#F59E0B", "#6366F1"];
const CELEBRATION_DURATION = 4000;

export function TrackCompletionHero() {
  const firedRef = useRef(false);

  const fireCelebration = useCallback(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const end = Date.now() + CELEBRATION_DURATION;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.3 },
        colors: BRAND_COLORS,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.3 },
        colors: BRAND_COLORS,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    // Brief pause before showing confetti so the page renders first
    const timer = setTimeout(fireCelebration, 400);
    return () => clearTimeout(timer);
  }, [fireCelebration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center"
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-emerald/10">
        <GraduationCap
          className="h-8 w-8 text-brand-emerald"
          aria-hidden="true"
        />
      </div>

      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        Track 1 Complete!
      </h1>

      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        You worked through all 15 challenges and unlocked every pattern.
        That&apos;s real growth — not just syntax, but thinking like a developer.
      </p>
    </motion.div>
  );
}
