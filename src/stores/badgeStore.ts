import { create } from "zustand";
import type { UserBadge } from "@/types/badge";

const STORAGE_KEY = "codereps-badges";

interface BadgeState {
  badges: Record<string, UserBadge>;
  hydrated: boolean;

  hydrate: () => void;
  hasBadge: (slug: string) => boolean;
  getBadge: (slug: string) => UserBadge | null;
  getAllEarnedBadges: () => UserBadge[];
  awardBadge: (slug: string, metadata?: Record<string, unknown> | null) => void;
}

function persistToStorage(badges: Record<string, UserBadge>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(badges));
  } catch {
    // Storage full or unavailable
  }
}

function loadFromStorage(): Record<string, UserBadge> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as Record<string, UserBadge>;
    }
  } catch {
    // Corrupted data — start fresh
  }
  return {};
}

export const useBadgeStore = create<BadgeState>((set, get) => ({
  badges: {},
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;
    const stored = loadFromStorage();
    set({ badges: stored, hydrated: true });
  },

  hasBadge: (slug) => {
    return slug in get().badges;
  },

  getBadge: (slug) => {
    return get().badges[slug] ?? null;
  },

  getAllEarnedBadges: () => {
    return Object.values(get().badges);
  },

  awardBadge: (slug, metadata = null) => {
    const { badges } = get();
    // Idempotent: do not overwrite an existing badge
    if (badges[slug]) return;

    const updated = {
      ...badges,
      [slug]: {
        badgeSlug: slug,
        earnedAt: new Date().toISOString(),
        metadata,
      },
    };
    set({ badges: updated });
    persistToStorage(updated);
  },
}));
