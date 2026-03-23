import type { BadgeDefinition } from "@/types/badge";

export const DOM_BUILDER_BADGE: BadgeDefinition = {
  slug: "dom-builder",
  name: "DOM Builder",
  description:
    "Awarded for completing all 15 DOM Manipulation challenges. You can select, create, modify, and orchestrate DOM elements with confidence.",
  icon: "shield-check",
  trackSlug: "dom-manipulation",
};

const allBadges: BadgeDefinition[] = [DOM_BUILDER_BADGE];

export function getBadgeBySlug(slug: string): BadgeDefinition | undefined {
  return allBadges.find((b) => b.slug === slug);
}

export function getAllBadges(): BadgeDefinition[] {
  return allBadges;
}
