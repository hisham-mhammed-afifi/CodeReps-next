"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import type { PatternDefinition } from "@/types/challenge";

interface ChallengeExplanationProps {
  explanation: string;
  patterns: PatternDefinition[];
}

export function ChallengeExplanation({
  explanation,
  patterns,
}: ChallengeExplanationProps) {
  // Bold all pattern names within the explanation text
  const highlightedExplanation = patterns.reduce((text, pattern) => {
    const escaped = pattern.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return text.replace(
      new RegExp(`(${escaped})`, "gi"),
      "**$1**",
    );
  }, explanation);

  // Convert **text** to bold spans
  const parts = highlightedExplanation.split(/\*\*(.*?)\*\*/g);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-lg border border-brand-indigo/20 bg-brand-indigo/5 p-4 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <Lightbulb
          className="h-5 w-5 shrink-0 text-brand-indigo mt-0.5"
          aria-hidden="true"
        />
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-brand-indigo">
            What You Discovered
          </h3>
          <p className="text-sm leading-relaxed text-foreground">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-semibold text-brand-indigo">
                  {part}
                </strong>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
