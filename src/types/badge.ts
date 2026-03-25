export interface BadgeDefinition {
  slug: string;
  name: string;
  description: string;
  icon: string;
  trackSlug: string | null;
}

export interface UserBadge {
  badgeSlug: string;
  earnedAt: string;
  metadata: Record<string, unknown> | null;
}
