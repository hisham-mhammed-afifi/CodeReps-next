import type { ChallengeDefinition } from "@/types/challenge";
import { theGreetingMachine } from "./the-greeting-machine";
import { evenOrOdd } from "./even-or-odd";
import { findTheLongestWord } from "./find-the-longest-word";
import { doubleTheNumbers } from "./double-the-numbers";
import { countTheVowels } from "./count-the-vowels";
import { reverseAString } from "./reverse-a-string";
import { removeDuplicates } from "./remove-duplicates";
import { fizzbuzz } from "./fizzbuzz";
import { sumOfPositives } from "./sum-of-positives";
import { capitalizeFirstLetter } from "./capitalize-first-letter";
import { findTheIndex } from "./find-the-index";
import { groupByProperty } from "./group-by-property";
import { flattenAnArray } from "./flatten-an-array";
import { createALookupObject } from "./create-a-lookup-object";
import { chainOfTransformations } from "./chain-of-transformations";

export const track1Challenges: ChallengeDefinition[] = [
  theGreetingMachine,
  evenOrOdd,
  findTheLongestWord,
  doubleTheNumbers,
  countTheVowels,
  reverseAString,
  removeDuplicates,
  fizzbuzz,
  sumOfPositives,
  capitalizeFirstLetter,
  findTheIndex,
  groupByProperty,
  flattenAnArray,
  createALookupObject,
  chainOfTransformations,
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

export function getAllChallenges() {
  return track1Challenges;
}
