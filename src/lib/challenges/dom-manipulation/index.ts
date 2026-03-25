import type { ChallengeDefinition } from "@/types/challenge";
import { changeTheHeadline } from "./change-the-headline";
import { buildAProfileCard } from "./build-a-profile-card";
import { renderAList } from "./render-a-list";
import { toggleDarkMode } from "./toggle-dark-mode";
import { highlightAllLinks } from "./highlight-all-links";
import { clearAndRebuildATodoList } from "./clear-and-rebuild-a-todo-list";
import { buildAProductTable } from "./build-a-product-table";
import { swapTwoElements } from "./swap-two-elements";
import { cloneATemplateCard } from "./clone-a-template-card";
import { readDataAttributes } from "./read-data-attributes";
import { removeCompletedItems } from "./remove-completed-items";
import { sortAListAlphabetically } from "./sort-a-list-alphabetically";
import { buildABreadcrumbTrail } from "./build-a-breadcrumb-trail";
import { buildAStarRatingDisplay } from "./build-a-star-rating-display";
import { dynamicFilterUi } from "./dynamic-filter-ui";

export const track2Challenges: ChallengeDefinition[] = [
  changeTheHeadline,
  buildAProfileCard,
  renderAList,
  toggleDarkMode,
  highlightAllLinks,
  clearAndRebuildATodoList,
  buildAProductTable,
  swapTwoElements,
  cloneATemplateCard,
  readDataAttributes,
  removeCompletedItems,
  sortAListAlphabetically,
  buildABreadcrumbTrail,
  buildAStarRatingDisplay,
  dynamicFilterUi,
];

export function getTrack2ChallengeBySlug(
  slug: string,
): ChallengeDefinition | undefined {
  return track2Challenges.find((c) => c.slug === slug);
}

export function getNextTrack2ChallengeSlug(
  currentSlug: string,
): string | null {
  const idx = track2Challenges.findIndex((c) => c.slug === currentSlug);
  if (idx === -1 || idx >= track2Challenges.length - 1) return null;
  return track2Challenges[idx + 1].slug;
}

export function getAllTrack2Challenges(): ChallengeDefinition[] {
  return track2Challenges;
}
