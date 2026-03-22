"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ChallengeDefinition } from "@/types/challenge";
import type { ChallengeMode } from "@/types/progress";
import { useChallengeStore } from "@/stores/challengeStore";
import { useProgressStore } from "@/stores/progressStore";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useTimeTracker } from "@/hooks/useTimeTracker";
import { StepIndicator } from "./StepIndicator";
import { StepTransition } from "./StepTransition";
import { StepUnderstand } from "./StepUnderstand";
import { StepBreakdown } from "./StepBreakdown";
import { StepMapToCode } from "./StepMapToCode";
import { StepCodeEditor } from "./StepCodeEditor";
import { StepVerify } from "./StepVerify";
import { CompletionFlow } from "./CompletionFlow";
import { SemiGuidedWorkspace } from "./SemiGuidedWorkspace";
import { IndependentWorkspace } from "./IndependentWorkspace";
import { ModeSelector } from "./ModeSelector";
import { ToastContainer } from "@/components/ui/toast";
import { getNextChallengeSlug } from "@/lib/challenges/track-1-fundamentals";

interface ChallengeWorkspaceProps {
  challenge: ChallengeDefinition;
  mode?: ChallengeMode;
}

function DraggableDivider({
  onDrag,
}: {
  onDrag: (deltaX: number) => void;
}) {
  const dragging = useRef(false);
  const lastX = useRef(0);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      lastX.current = e.clientX;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const delta = e.clientX - lastX.current;
      lastX.current = e.clientX;
      onDrag(delta);
    },
    [onDrag],
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      className="hidden lg:flex w-1.5 cursor-col-resize items-center justify-center bg-border hover:bg-brand-indigo/40 transition-colors shrink-0"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize panes"
      tabIndex={0}
    >
      <div className="h-8 w-0.5 rounded-full bg-brand-slate-400/40" />
    </div>
  );
}

export function ChallengeWorkspace({ challenge, mode = "guided" }: ChallengeWorkspaceProps) {
  if (mode === "independent") {
    return <IndependentWorkspace challenge={challenge} />;
  }

  if (mode === "semi_guided") {
    return <SemiGuidedWorkspace challenge={challenge} />;
  }

  return <GuidedWorkspace challenge={challenge} />;
}

function GuidedWorkspace({ challenge }: { challenge: ChallengeDefinition }) {
  const {
    currentStep,
    stepDirection,
    completedSteps,
    challengeCompleted,
    setChallenge,
    setCurrentStep,
    advanceToNextStep,
    completeStep,
    isStepAccessible,
    setChallengeCompleted,
  } = useChallengeStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const { hydrate, getProgress, initProgress, addTime, updateMode } = useProgressStore();
  const { toasts, removeToast } = useAutoSave(challenge.slug);

  const [leftPanePercent, setLeftPanePercent] = useState(40);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hydrate progress store and restore saved progress
  useEffect(() => {
    hydrate();
    const saved = getProgress(challenge.slug);
    setChallenge(challenge, saved);
    initProgress(challenge.slug);
  }, [challenge, setChallenge, hydrate, getProgress, initProgress]);

  // Track time spent on this challenge
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
      Math.min(70, Math.max(25, prev + deltaPercent)),
    );
  }, []);

  const handleAllTestsPassed = useCallback(() => {
    completeStep("verify");
    setChallengeCompleted(true);
  }, [completeStep, setChallengeCompleted]);

  const handleModeChange = useCallback(
    (newMode: ChallengeMode) => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("codereps:mode_switched", {
            detail: { from_mode: "guided", to_mode: newMode },
          }),
        );
      }
      updateMode(challenge.slug, newMode);
      const params = new URLSearchParams(searchParams.toString());
      params.set("mode", newMode);
      router.push(`/challenge/${challenge.slug}?${params.toString()}`);
    },
    [challenge.slug, router, searchParams, updateMode],
  );

  const nextChallengeSlug = getNextChallengeSlug(challenge.slug);

  const isOnWriteOrVerify = currentStep === "write" || currentStep === "verify";

  function renderGuidanceStep() {
    switch (currentStep) {
      case "understand":
        return (
          <StepUnderstand
            problemStatement={challenge.problemStatement}
            exampleCalls={challenge.exampleCalls}
            expectedUnderstanding={challenge.expectedUnderstanding}
            onComplete={advanceToNextStep}
          />
        );
      case "breakdown":
        return (
          <StepBreakdown
            blocks={challenge.breakdownBlocks}
            onComplete={advanceToNextStep}
          />
        );
      case "map":
        return (
          <StepMapToCode
            conceptOptions={challenge.conceptOptions}
            systemHint={challenge.systemHint}
            onComplete={advanceToNextStep}
          />
        );
      case "write":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">
              Step 4: Write Your Solution
            </h2>
            <p className="text-sm text-muted-foreground">
              Use the code editor to write your solution. The starter code
              includes comments to guide you.
            </p>
            <p className="text-sm text-muted-foreground">
              When you&apos;re ready, move to the Verify step to run tests.
            </p>
            <button
              onClick={advanceToNextStep}
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-brand-indigo px-4 py-2 text-sm font-medium text-white hover:bg-brand-indigo/90 transition-colors"
            >
              Run Tests →
            </button>
          </div>
        );
      case "verify":
        return (
          <div className="space-y-6">
            <StepVerify
              testCases={challenge.testCases}
              onAllPassed={handleAllTestsPassed}
            />
            {challengeCompleted && (
              <CompletionFlow
                challenge={challenge}
                nextChallengeSlug={nextChallengeSlug}
              />
            )}
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <div className="border-b border-border bg-card px-4 py-3 sm:px-6">
        <div className="mb-3 flex items-start justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {challenge.title}
          </h1>
            <p className="text-sm text-muted-foreground">
              {challenge.difficulty} &middot; ~{challenge.estimatedMinutes} min
            </p>
          </div>
          <ModeSelector currentMode="guided" onModeChange={handleModeChange} />
        </div>
        <StepIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={setCurrentStep}
          isStepAccessible={isStepAccessible}
        />
      </div>

      <div
        ref={containerRef}
        className="flex flex-1 flex-col lg:flex-row overflow-hidden"
      >
        {/* Guidance pane */}
        <div
          className="w-full overflow-y-auto border-b lg:border-b-0 border-border p-4 sm:p-6"
          style={{
            flexBasis: `${leftPanePercent}%`,
            flexShrink: 0,
            flexGrow: 0,
          }}
        >
          <StepTransition stepKey={currentStep} direction={stepDirection}>
            {renderGuidanceStep()}
          </StepTransition>
        </div>

        {/* Draggable divider - desktop only */}
        <DraggableDivider onDrag={handleDividerDrag} />

        {/* Code editor pane */}
        <div className="flex-1 flex flex-col bg-brand-navy overflow-hidden min-h-[200px] lg:min-h-0">
          {isOnWriteOrVerify ? (
            <StepCodeEditor starterCode={challenge.starterCode} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-brand-slate-400 p-8">
              <div className="text-center space-y-2">
                <p className="font-mono text-sm">Code editor</p>
                <p className="text-xs text-brand-slate-400/60">
                  Available after completing Steps 1-3
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
