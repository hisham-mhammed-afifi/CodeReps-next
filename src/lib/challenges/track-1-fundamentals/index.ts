import type { ChallengeDefinition } from "@/types/challenge";
import { theGreetingMachine } from "./the-greeting-machine";

export const track1Challenges: ChallengeDefinition[] = [theGreetingMachine];

export function getChallengeBySlug(
  slug: string,
): ChallengeDefinition | undefined {
  return track1Challenges.find((c) => c.slug === slug);
}
