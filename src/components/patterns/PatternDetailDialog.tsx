"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Puzzle, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { LibraryPattern } from "@/lib/challenges/patterns";

interface PatternDetailDialogProps {
  pattern: LibraryPattern | null;
  onClose: () => void;
}

export function PatternDetailDialog({
  pattern,
  onClose,
}: PatternDetailDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!pattern) return;
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [pattern, handleKeyDown]);

  return (
    <AnimatePresence>
      {pattern && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Pattern detail: ${pattern.name}`}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-brand-white p-6 shadow-xl"
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo"
              aria-label="Close pattern detail"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-3 mb-4 pr-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-indigo/10">
                <Puzzle
                  className="h-5 w-5 text-brand-indigo"
                  aria-hidden="true"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Pattern
                  </p>
                  {pattern.trackSlug === "dom-manipulation" && (
                    <span className="inline-flex items-center rounded-full bg-brand-indigo/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-indigo">
                      DOM
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-brand-indigo">
                  {pattern.name}
                </h2>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                When you need to&hellip;
              </h3>
              <p className="text-sm text-brand-slate-600 leading-relaxed">
                {pattern.plainEnglish}
              </p>
            </div>

            {/* Code example */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Code example
              </h3>
              <div className="rounded-lg bg-brand-navy px-4 py-3">
                <code className="text-sm font-mono text-brand-emerald whitespace-pre-wrap leading-relaxed">
                  {pattern.codeExample}
                </code>
              </div>
            </div>

            {/* Source challenge link */}
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground mb-2">
                Unlocked from
              </p>
              <Link
                href={`/challenge/${pattern.challengeSlug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-cyan hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo rounded"
              >
                Challenge {pattern.challengeOrder}: {pattern.challengeTitle}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
