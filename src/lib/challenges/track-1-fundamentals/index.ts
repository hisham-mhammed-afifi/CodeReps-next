import type { ChallengeDefinition } from "@/types/challenge";
import { theGreetingMachine } from "./the-greeting-machine";
import { evenOrOdd } from "./even-or-odd";

export const track1Challenges: ChallengeDefinition[] = [
  theGreetingMachine,
  evenOrOdd,
];

export function getChallengeBySlug(
  slug: string,
): ChallengeDefinition | undefined {
  return track1Challenges.find((c) => c.slug === slug);
}

export function getNextChallengeSlug(currentSlug: string): string | null {
  const idx = track1Challenges.findIndex((c) => c.slug === currentSlug);
  if (idx === -1 || idx >= track1Challenges.length - 1) return null;
  return track1Challenges[idx + 1].slug;
}
