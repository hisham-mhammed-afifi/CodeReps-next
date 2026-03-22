import { create } from "zustand";
import type {
  UserProgress,
  ChallengeStatus,
  ChallengeMode,
} from "@/types/progress";

const STORAGE_KEY = "codereps-track1-progress";

interface ProgressState {
  /** Map of challenge slug -> UserProgress */
  challenges: Record<string, UserProgress>;
  /** Whether the store has been hydrated from localStorage */
  hydrated: boolean;

  hydrate: () => void;
  getProgress: (slug: string) => UserProgress | null;
  getChallengeStatus: (slug: string) => ChallengeStatus;
  isChallengeUnlocked: (slug: string, order: number) => boolean;
  getCompletedCount: () => number;
  isTrackCompleted: () => boolean;
  isFirstAttempt: (slug: string) => boolean;

  initProgress: (slug: string, mode?: ChallengeMode) => void;
  saveStepProgress: (
    slug: string,
    data: {
      completedSteps?: string[];
      lastStep?: string;
      userCode?: string;
      rephrasing?: string;
      blockOrder?: string[];
      concepts?: string[];
    },
  ) => void;
  updateMode: (slug: string, mode: ChallengeMode) => void;
  recordAttempt: (slug: string, code: string) => void;
  addTime: (slug: string, seconds: number) => void;
  completeChallenge: (slug: string, code: string) => void;
}

function createEmptyProgress(mode: ChallengeMode = "guided"): UserProgress {
  return {
    challengeId: "",
    status: "not_started",
    mode,
    attempts: 0,
    completedAt: null,
    userSolution: null,
    timeSpentSeconds: 0,
    completedSteps: [],
    lastStep: null,
    savedRephrasing: null,
    savedBlockOrder: null,
    savedConcepts: null,
  };
}

function persistToStorage(challenges: Record<string, UserProgress>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(challenges));
  } catch {
    // Storage full or unavailable — handled by auto-save retry
  }
}

function loadFromStorage(): Record<string, UserProgress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as Record<string, UserProgress>;
    }
  } catch {
    // Corrupted data — start fresh
  }
  return {};
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  challenges: {},
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;
    const stored = loadFromStorage();
    set({ challenges: stored, hydrated: true });
  },

  getProgress: (slug) => {
    return get().challenges[slug] ?? null;
  },

  getChallengeStatus: (slug) => {
    return get().challenges[slug]?.status ?? "not_started";
  },

  isChallengeUnlocked: (slug, order) => {
    // Challenge 1 is always unlocked
    if (order === 1) return true;

    const { challenges } = get();
    // If this challenge already has progress, it was unlocked at some point
    if (challenges[slug]) return true;

    return false;
  },

  getCompletedCount: () => {
    return Object.values(get().challenges).filter(
      (p) => p.status === "completed",
    ).length;
  },

  isTrackCompleted: () => {
    const TOTAL_TRACK_1_CHALLENGES = 15;
    return get().getCompletedCount() >= TOTAL_TRACK_1_CHALLENGES;
  },

  isFirstAttempt: (slug) => {
    const progress = get().challenges[slug];
    return !progress || progress.status === "not_started";
  },

  initProgress: (slug, mode = "guided") => {
    const { challenges } = get();
    if (challenges[slug] && challenges[slug].status !== "not_started") return;

    const updated = {
      ...challenges,
      [slug]: {
        ...createEmptyProgress(mode),
        challengeId: slug,
        status: "in_progress" as ChallengeStatus,
      },
    };
    set({ challenges: updated });
    persistToStorage(updated);
  },

  saveStepProgress: (slug, data) => {
    const { challenges } = get();
    const current = challenges[slug] ?? {
      ...createEmptyProgress(),
      challengeId: slug,
      status: "in_progress" as ChallengeStatus,
    };

    const updated = {
      ...challenges,
      [slug]: {
        ...current,
        status:
          current.status === "not_started"
            ? ("in_progress" as ChallengeStatus)
            : current.status,
        completedSteps: data.completedSteps ?? current.completedSteps,
        lastStep: data.lastStep ?? current.lastStep,
        userSolution: data.userCode ?? current.userSolution,
        savedRephrasing: data.rephrasing ?? current.savedRephrasing,
        savedBlockOrder: data.blockOrder ?? current.savedBlockOrder,
        savedConcepts: data.concepts ?? current.savedConcepts,
      },
    };
    set({ challenges: updated });
    persistToStorage(updated);
  },

  updateMode: (slug, mode) => {
    const { challenges } = get();
    const current = challenges[slug];
    if (!current) return;

    const updated = {
      ...challenges,
      [slug]: {
        ...current,
        mode,
      },
    };
    set({ challenges: updated });
    persistToStorage(updated);
  },

  recordAttempt: (slug, code) => {
    const { challenges } = get();
    const current = challenges[slug] ?? {
      ...createEmptyProgress(),
      challengeId: slug,
      status: "in_progress" as ChallengeStatus,
    };

    const updated = {
      ...challenges,
      [slug]: {
        ...current,
        attempts: current.attempts + 1,
        userSolution: code,
      },
    };
    set({ challenges: updated });
    persistToStorage(updated);
  },

  addTime: (slug, seconds) => {
    const { challenges } = get();
    const current = challenges[slug];
    if (!current) return;

    const updated = {
      ...challenges,
      [slug]: {
        ...current,
        timeSpentSeconds: current.timeSpentSeconds + seconds,
      },
    };
    set({ challenges: updated });
    persistToStorage(updated);
  },

  completeChallenge: (slug, code) => {
    const { challenges } = get();
    const current = challenges[slug] ?? {
      ...createEmptyProgress(),
      challengeId: slug,
    };

    const updated: Record<string, UserProgress> = {
      ...challenges,
      [slug]: {
        ...current,
        status: "completed",
        completedAt: new Date().toISOString(),
        userSolution: code,
        completedSteps: [
          "understand",
          "breakdown",
          "map",
          "write",
          "verify",
        ],
      },
    };

    set({ challenges: updated });
    persistToStorage(updated);
  },
}));
