"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Tracks elapsed time for a challenge, pausing when the tab is hidden
 * or the window loses focus. Calls `onTick` every `intervalSeconds`
 * with the number of seconds elapsed since the last tick.
 */
export function useTimeTracker(
  active: boolean,
  onTick: (seconds: number) => void,
  intervalSeconds: number = 10,
) {
  const lastTickRef = useRef<number>(0);
  const activeRef = useRef(active);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  const flush = useCallback(() => {
    const now = Date.now();
    const elapsed = Math.floor((now - lastTickRef.current) / 1000);
    if (elapsed > 0 && activeRef.current) {
      onTickRef.current(elapsed);
    }
    lastTickRef.current = now;
  }, []);

  useEffect(() => {
    if (!active) return;

    lastTickRef.current = Date.now();

    const interval = setInterval(() => {
      if (!document.hidden && activeRef.current) {
        flush();
      }
    }, intervalSeconds * 1000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        flush();
      } else {
        lastTickRef.current = Date.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      flush();
    };
  }, [active, intervalSeconds, flush]);
}
