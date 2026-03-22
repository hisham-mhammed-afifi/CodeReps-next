"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ChallengeDefinition } from "@/types/challenge";
import { useChallengeStore } from "@/stores/challengeStore";
import { useProgressStore } from "@/stores/progressStore";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useTimeTracker } from "@/hooks/useTimeTracker";
import { StepCodeEditor } from "./StepCodeEditor";
import { StepVerify } from "./StepVerify";
import { CompletionFlow } from "./CompletionFlow";
import { ModeSelector } from "./ModeSelector";
import { ToastContainer } from "@/components/ui/toast";
import { getNextChallengeSlug } from "@/lib/challenges/track-1-fundamentals";
import type { ChallengeMode } from "@/types/progress";

interface IndependentWorkspaceProps {
  challenge: ChallengeDefinition;
  availableModes?: ChallengeMode[];
  encourageIndependent?: boolean;
}

/** Strip all guiding comments, keeping only the function signature with an empty body. */
function getFunctionSignature(starterCode: string): string {
  return starterCode
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");
}

export function IndependentWorkspace({
  challenge,
  availableModes,
  encourageIndependent,
}: IndependentWorkspaceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    challengeCompleted,
    setChallenge,
    completeStep,
    setChallengeCompleted,
    setMode,
  } = useChallengeStore();

  const { hydrate, getProgress, initProgress, addTime, updateMode } =
    useProgressStore();
  const { toasts, removeToast } = useAutoSave(challenge.slug);

  const [leftPanePercent, setLeftPanePercent] = useState(35);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hydrate progress store and initialize for independent mode
  useEffect(() => {
    hydrate();
    const saved = getProgress(challenge.slug);
    const independentChallenge = {
      ...challenge,
      starterCode: getFunctionSignature(challenge.starterCode),
    };
    setChallenge(independentChallenge, saved);
    setMode("independent");
    initProgress(challenge.slug, "independent");
  }, [challenge, setChallenge, setMode, hydrate, getProgress, initProgress]);

  // Track time spent
  useTimeTracker(
    !challengeCompleted,
    useCallback(
      (seconds: number) => {
        addTime(challenge.slug, seconds);
      },
      [challenge.slug, addTime],
    ),
  );

  const handleDividerDrag = useCallback((deltaX: number) => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const deltaPercent = (deltaX / containerWidth) * 100;
    setLeftPanePercent((prev) =>
      Math.min(50, Math.max(20, prev + deltaPercent)),
    );
  }, []);

  const handleAllTestsPassed = useCallback(() => {
    completeStep("verify");
    setChallengeCompleted(true);
  }, [completeStep, setChallengeCompleted]);

  const handleModeChange = useCallback(
    (newMode: ChallengeMode) => {
      // Track mode_switched event (analytics placeholder)
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("codereps:mode_switched", {
            detail: { from_mode: "independent", to_mode: newMode },
          }),
        );
      }

      // Update progress store with new mode
      updateMode(challenge.slug, newMode);

      // Navigate to the same challenge with the new mode
      const params = new URLSearchParams(searchParams.toString());
      params.set("mode", newMode);
      router.push(`/challenge/${challenge.slug}?${params.toString()}`);
    },
    [challenge.slug, router, searchParams, updateMode],
  );

  const nextChallengeSlug = getNextChallengeSlug(challenge.slug);
  const independentStarterCode = getFunctionSignature(challenge.starterCode);

  return (
    <div className="flex flex-col h-full">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Header — clean and minimal */}
      <div className="border-b border-border bg-card px-4 py-3 sm:px-6 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {challenge.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {challenge.difficulty} &middot; ~{challenge.estimatedMinutes} min
            &middot;{" "}
            <span className="text-brand-indigo font-medium">Independent</span>
          </p>
        </div>
        <ModeSelector
          currentMode="independent"
          onModeChange={handleModeChange}
          availableModes={availableModes}
          encourageIndependent={encourageIndependent}
        />
      </div>

      <div
        ref={containerRef}
        className="flex flex-1 flex-col lg:flex-row overflow-hidden"
      >
        {/* Problem statement pane */}
        <div
          className="w-full overflow-y-auto border-b lg:border-b-0 lg:border-r border-border p-4 sm:p-6"
          style={{
            flexBasis: `${leftPanePercent}%`,
            flexShrink: 0,
            flexGrow: 0,
          }}
        >
          <h2 className="text-lg font-bold text-foreground mb-3">
            Problem
          </h2>
          <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">
              {challenge.problemStatement}
            </p>
          </div>

          {challenge.exampleCalls && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Examples
              </h3>
              <pre className="rounded-lg bg-brand-navy p-3 text-sm font-mono text-brand-slate-100 overflow-x-auto">
                {challenge.exampleCalls}
              </pre>
            </div>
          )}
        </div>

        {/* Draggable divider - desktop only */}
        <div
          className="hidden lg:flex w-1.5 cursor-col-resize items-center justify-center bg-border hover:bg-brand-indigo/40 transition-colors shrink-0"
          onPointerDown={(e) => {
            const el = e.currentTarget;
            el.setPointerCapture(e.pointerId);
            let lastX = e.clientX;
            const onMove = (ev: PointerEvent) => {
              const delta = ev.clientX - lastX;
              lastX = ev.clientX;
              handleDividerDrag(delta);
            };
            const onUp = () => {
              el.removeEventListener("pointermove", onMove);
              el.removeEventListener("pointerup", onUp);
            };
            el.addEventListener("pointermove", onMove);
            el.addEventListener("pointerup", onUp);
          }}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panes"
          tabIndex={0}
        >
          <div className="h-8 w-0.5 rounded-full bg-brand-slate-400/40" />
        </div>

        {/* Main content: editor + verify */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Code editor */}
          <div className="flex-1 flex flex-col bg-brand-navy overflow-hidden min-h-[200px] lg:min-h-0">
            <StepCodeEditor starterCode={independentStarterCode} />
          </div>

          {/* Verify section */}
          <div className="border-t border-border bg-card p-4 overflow-y-auto max-h-[40%]">
            <StepVerify
              testCases={challenge.testCases}
              onAllPassed={handleAllTestsPassed}
            />
            {challengeCompleted && (
              <div className="mt-4">
                <CompletionFlow
                  challenge={challenge}
                  nextChallengeSlug={nextChallengeSlug}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
