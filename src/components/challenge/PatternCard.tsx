"use client";

import { motion } from "framer-motion";
import { Puzzle } from "lucide-react";
import type { PatternDefinition } from "@/types/challenge";

interface PatternCardProps {
  pattern: PatternDefinition;
  challengeSlug: string;
  challengeTitle: string;
  index: number;
}

export function PatternCard({
  pattern,
  challengeSlug,
  challengeTitle,
  index,
}: PatternCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: 0.6 + index * 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="rounded-xl border border-border bg-brand-white p-4 sm:p-5 shadow-sm"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-indigo/10">
          <Puzzle className="h-4 w-4 text-brand-indigo" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Pattern Unlocked
          </p>
          <h4 className="text-base font-bold text-brand-indigo">
            {pattern.name}
          </h4>
        </div>
      </div>

      <p className="text-sm text-foreground leading-relaxed mb-3">
        {pattern.plainEnglish}
      </p>

      <div className="rounded-md bg-brand-navy px-3 py-2.5">
        <code className="text-xs font-mono text-brand-emerald whitespace-pre-wrap">
          {pattern.codeExample}
        </code>
      </div>

      <a
        href={`/challenge/${challengeSlug}`}
        className="mt-3 inline-flex items-center gap-1 text-xs text-brand-cyan hover:underline"
      >
        Source: {challengeTitle}
      </a>
    </motion.div>
  );
}
