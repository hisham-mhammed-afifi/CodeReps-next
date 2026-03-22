"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ArrowRight, LayoutGrid, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChallengeExplanation } from "./ChallengeExplanation";
import { PatternCard } from "./PatternCard";
import { Confetti } from "./Confetti";
import { ToastContainer } from "@/components/ui/toast";
import { useToast } from "@/hooks/useToast";
import { useProgressStore } from "@/stores/progressStore";
import { useChallengeStore } from "@/stores/challengeStore";
import type { ChallengeDefinition } from "@/types/challenge";

interface CompletionFlowProps {
  challenge: ChallengeDefinition;
  nextChallengeSlug: string | null;
}

export function CompletionFlow({
  challenge,
  nextChallengeSlug,
}: CompletionFlowProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const { toasts, addToast, removeToast } = useToast();
  const [toastsTriggered, setToastsTriggered] = useState(false);
  const persistedRef = useRef(false);
  const isTrackComplete = useProgressStore((s) => s.isTrackCompleted);

  // Persist completion to progress store (once)
  useEffect(() => {
    if (persistedRef.current) return;
    persistedRef.current = true;

    const { userCode } = useChallengeStore.getState();
    useProgressStore.getState().completeChallenge(challenge.slug, userCode);
  }, [challenge.slug]);

  // Fire toast notifications for each pattern (once)
  const handleConfettiDismiss = useCallback(() => {
    setShowConfetti(false);
    if (!toastsTriggered) {
      setToastsTriggered(true);
      challenge.patternsUnlocked.forEach((pattern, i) => {
        setTimeout(() => {
          addToast(`Pattern unlocked: ${pattern.name}`);
        }, i * 600);
      });
    }
  }, [challenge.patternsUnlocked, addToast, toastsTriggered]);

  return (
    <>
      <Confetti active={showConfetti} onDismiss={handleConfettiDismiss} />
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <div className="flex flex-col gap-5">
        {/* Explanation */}
        <ChallengeExplanation
          explanation={challenge.explanation}
          patterns={challenge.patternsUnlocked}
        />

        {/* Pattern cards */}
        <div className="space-y-3">
          {challenge.patternsUnlocked.map((pattern, i) => (
            <PatternCard
              key={pattern.name}
              pattern={pattern}
              challengeSlug={challenge.slug}
              challengeTitle={challenge.title}
              index={i}
            />
          ))}
        </div>

        {/* Continue buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + challenge.patternsUnlocked.length * 0.3 }}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          {!nextChallengeSlug && isTrackComplete() ? (
            <a
              href="/track-complete"
              className={cn(
                buttonVariants({ variant: "default" }),
                "gap-2 bg-brand-emerald hover:bg-brand-emerald/90",
              )}
            >
              <Trophy className="h-4 w-4" />
              View Track Completion
            </a>
          ) : nextChallengeSlug ? (
            <a
              href={`/challenge/${nextChallengeSlug}`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "gap-2 bg-brand-indigo hover:bg-brand-indigo/90",
              )}
            >
              Next Challenge
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : null}
          <a
            href="/dashboard"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
          >
            <LayoutGrid className="h-4 w-4" />
            Back to Track
          </a>
        </motion.div>
      </div>
    </>
  );
}
