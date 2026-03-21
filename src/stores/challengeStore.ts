import { create } from "zustand";
import type { StepId, ChallengeDefinition } from "@/types/challenge";

interface ChallengeState {
  challenge: ChallengeDefinition | null;
  currentStep: StepId;
  stepDirection: "forward" | "backward";
  completedSteps: Set<StepId>;
  userRephrasing: string;
  blockOrder: string[];
  selectedConcepts: Set<string>;
  stepSubmitted: Record<StepId, boolean>;

  setChallenge: (challenge: ChallengeDefinition) => void;
  setCurrentStep: (step: StepId) => void;
  completeStep: (step: StepId) => void;
  isStepAccessible: (step: StepId) => boolean;
  isStepCompleted: (step: StepId) => boolean;
  setUserRephrasing: (text: string) => void;
  setBlockOrder: (order: string[]) => void;
  setSelectedConcepts: (concepts: Set<string>) => void;
  markStepSubmitted: (step: StepId) => void;
  isStepSubmitted: (step: StepId) => boolean;
  advanceToNextStep: () => void;
  reset: () => void;
}

const STEP_ORDER: StepId[] = [
  "understand",
  "breakdown",
  "map",
  "write",
  "verify",
];

function getNextStep(current: StepId): StepId | null {
  const idx = STEP_ORDER.indexOf(current);
  return idx < STEP_ORDER.length - 1 ? STEP_ORDER[idx + 1] : null;
}

function isStepBefore(a: StepId, b: StepId): boolean {
  return STEP_ORDER.indexOf(a) < STEP_ORDER.indexOf(b);
}

export const useChallengeStore = create<ChallengeState>((set, get) => ({
  challenge: null,
  currentStep: "understand",
  stepDirection: "forward" as const,
  completedSteps: new Set<StepId>(),
  userRephrasing: "",
  blockOrder: [],
  selectedConcepts: new Set<string>(),
  stepSubmitted: {
    understand: false,
    breakdown: false,
    map: false,
    write: false,
    verify: false,
  },

  setChallenge: (challenge) =>
    set({
      challenge,
      currentStep: "understand",
      stepDirection: "forward" as const,
      completedSteps: new Set<StepId>(),
      userRephrasing: "",
      blockOrder: [],
      selectedConcepts: new Set<string>(),
      stepSubmitted: {
        understand: false,
        breakdown: false,
        map: false,
        write: false,
        verify: false,
      },
    }),

  setCurrentStep: (step) => {
    const state = get();
    if (state.isStepAccessible(step)) {
      const dir =
        STEP_ORDER.indexOf(step) >= STEP_ORDER.indexOf(state.currentStep)
          ? ("forward" as const)
          : ("backward" as const);
      set({ currentStep: step, stepDirection: dir });
    }
  },

  completeStep: (step) => {
    const completed = new Set(get().completedSteps);
    completed.add(step);
    set({ completedSteps: completed });
  },

  isStepAccessible: (step) => {
    const { completedSteps } = get();
    if (step === "understand") return true;
    // A step is accessible if all previous steps are completed
    return STEP_ORDER.filter((s) => isStepBefore(s, step)).every((s) =>
      completedSteps.has(s),
    );
  },

  isStepCompleted: (step) => get().completedSteps.has(step),

  setUserRephrasing: (text) => set({ userRephrasing: text }),

  setBlockOrder: (order) => set({ blockOrder: order }),

  setSelectedConcepts: (concepts) => set({ selectedConcepts: concepts }),

  markStepSubmitted: (step) =>
    set((state) => ({
      stepSubmitted: { ...state.stepSubmitted, [step]: true },
    })),

  isStepSubmitted: (step) => get().stepSubmitted[step],

  advanceToNextStep: () => {
    const { currentStep, completedSteps } = get();
    const completed = new Set(completedSteps);
    completed.add(currentStep);
    const next = getNextStep(currentStep);
    if (next) {
      set({ completedSteps: completed, currentStep: next, stepDirection: "forward" as const });
    } else {
      set({ completedSteps: completed });
    }
  },

  reset: () =>
    set({
      challenge: null,
      currentStep: "understand",
      stepDirection: "forward" as const,
      completedSteps: new Set<StepId>(),
      userRephrasing: "",
      blockOrder: [],
      selectedConcepts: new Set<string>(),
      stepSubmitted: {
        understand: false,
        breakdown: false,
        map: false,
        write: false,
        verify: false,
      },
    }),
}));
