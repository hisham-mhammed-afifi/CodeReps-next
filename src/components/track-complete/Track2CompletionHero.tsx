"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Star } from "lucide-react";

const BRAND_COLORS = ["#10B981", "#F59E0B", "#6366F1"];
const CELEBRATION_DURATION = 5000;

interface Track2CompletionHeroProps {
  noHints: boolean;
}

export function Track2CompletionHero({ noHints }: Track2CompletionHeroProps) {
  const firedRef = useRef(false);
  const [showBadge, setShowBadge] = useState(false);

  const fireCelebration = useCallback(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setShowBadge(true);
      return;
    }

    const end = Date.now() + CELEBRATION_DURATION;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.3 },
        colors: BRAND_COLORS,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.3 },
        colors: BRAND_COLORS,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Reveal badge after a short delay into the celebration
    setTimeout(() => setShowBadge(true), 800);
  }, []);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

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
      {/* Badge reveal */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              duration: 0.8,
            }}
            className="mx-auto mb-5 relative inline-flex"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-indigo/10 shadow-[0_0_24px_4px_rgba(99,102,241,0.2)]">
              <ShieldCheck
                className="h-10 w-10 text-brand-indigo"
                aria-hidden="true"
              />
            </div>
            {noHints && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                className="absolute -right-1.5 -top-1.5"
              >
                <Star
                  className="h-6 w-6 fill-brand-amber text-brand-amber drop-shadow-sm"
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
        Track 2 Complete!
      </h1>

      <p className="mx-auto mt-2 text-sm font-semibold text-brand-indigo">
        DOM Builder Badge Earned
      </p>

      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        You conquered all 15 DOM manipulation challenges. You can now select,
        create, modify, and orchestrate elements on the page — that&apos;s real
        frontend power.
      </p>
    </motion.div>
  );
}
