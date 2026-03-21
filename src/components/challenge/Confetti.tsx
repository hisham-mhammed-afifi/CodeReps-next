"use client";

import { useEffect, useCallback, useRef } from "react";
import confetti from "canvas-confetti";

const BRAND_COLORS = ["#10B981", "#F59E0B", "#6366F1"]; // Emerald, Amber, Indigo
const DURATION = 2000;

interface ConfettiProps {
  active: boolean;
  onDismiss?: () => void;
}

export function Confetti({ active, onDismiss }: ConfettiProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animRef = useRef<number | null>(null);

  const fire = useCallback(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const end = Date.now() + DURATION;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0 },
        colors: BRAND_COLORS,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0 },
        colors: BRAND_COLORS,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        animRef.current = requestAnimationFrame(frame);
      }
    };

    frame();

    timerRef.current = setTimeout(() => {
      onDismiss?.();
    }, DURATION);
  }, [onDismiss]);

  useEffect(() => {
    if (active) {
      fire();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [active, fire]);

  if (!active) return null;

  // Invisible click target to allow dismissal
  return (
    <button
      className="fixed inset-0 z-[100] cursor-default"
      onClick={() => {
        confetti.reset();
        if (timerRef.current) clearTimeout(timerRef.current);
        if (animRef.current) cancelAnimationFrame(animRef.current);
        onDismiss?.();
      }}
      aria-label="Dismiss celebration animation"
      tabIndex={-1}
    />
  );
}
