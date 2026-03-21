"use client";

import { useEffect, useRef } from "react";
import { useChallengeStore } from "@/stores/challengeStore";
import { useProgressStore } from "@/stores/progressStore";
import { useToast } from "./useToast";

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

/**
 * Auto-saves challenge progress to localStorage whenever steps are completed,
 * code changes, or a submission is made. Shows a non-blocking toast on failure
 * and retries with exponential backoff.
 */
export function useAutoSave(challengeSlug: string) {
  const { toasts, addToast, removeToast } = useToast();
  const slugRef = useRef(challengeSlug);
  const addToastRef = useRef(addToast);

  useEffect(() => {
    slugRef.current = challengeSlug;
  }, [challengeSlug]);

  useEffect(() => {
    addToastRef.current = addToast;
  }, [addToast]);

  useEffect(() => {
    let retryCount = 0;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    function save() {
      const {
        completedSteps,
        currentStep,
        userCode,
        userRephrasing,
        blockOrder,
        selectedConcepts,
      } = useChallengeStore.getState();

      try {
        useProgressStore.getState().saveStepProgress(slugRef.current, {
          completedSteps: Array.from(completedSteps),
          lastStep: currentStep,
          userCode,
          rephrasing: userRephrasing,
          blockOrder,
          concepts: Array.from(selectedConcepts),
        });
        retryCount = 0;
      } catch {
        retryCount += 1;
        if (retryCount <= MAX_RETRIES) {
          const delay = BASE_DELAY_MS * Math.pow(2, retryCount - 1);
          retryTimer = setTimeout(save, delay);
        } else {
          addToastRef.current(
            "Progress couldn't save. We'll retry automatically.",
            "info",
          );
          retryCount = 0;
        }
      }
    }

    const unsubChallenge = useChallengeStore.subscribe(
      (state, prevState) => {
        const stepsChanged =
          state.completedSteps.size !== prevState.completedSteps.size;
        const stepChanged = state.currentStep !== prevState.currentStep;
        const codeChanged =
          state.userCode !== prevState.userCode &&
          state.userCode !== state.challenge?.starterCode;

        if (stepsChanged || stepChanged || codeChanged) {
          save();
        }
      },
    );

    return () => {
      unsubChallenge();
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    };
  }, []);

  return { toasts, removeToast };
}
