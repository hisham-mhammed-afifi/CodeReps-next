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
