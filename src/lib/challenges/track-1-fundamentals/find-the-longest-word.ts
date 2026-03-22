import type { ChallengeDefinition } from "@/types/challenge";

export const findTheLongestWord: ChallengeDefinition = {
  id: "challenge-03",
  slug: "find-the-longest-word",
  title: "Find the Longest Word",
  trackSlug: "track-1-fundamentals",
  order: 3,
  difficulty: "beginner",
  estimatedMinutes: 10,
  problemStatement:
    "Write a function called `longestWord` that takes an array of words and returns the longest one. If two words have the same length, return the first one.",
  exampleCalls:
    'longestWord(["cat", "elephant", "dog"])       --> "elephant"\nlongestWord(["hi", "hey", "hello"])           --> "hello"\nlongestWord(["same", "size", "word"])         --> "same"',
  expectedUnderstanding:
    "I need to go through a list of words, compare their lengths, and keep track of which one is the longest.",
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Start by assuming the first word is the longest",
      order: 1,
    },
    {
      id: "block-2",
      text: "Go through each word in the array",
      order: 2,
    },
    {
      id: "block-3",
      text: "Compare the current word's length to the longest so far",
      order: 3,
    },
    {
      id: "block-4",
      text: "If the current word is longer, it becomes the new longest",
      order: 4,
    },
    {
      id: "block-5",
      text: "After checking all words, return the longest one",
      order: 5,
    },
  ],
  conceptOptions: [
    {
      name: "for loop",
      isCorrect: true,
      explanation: "You need a loop to go through each word in the array.",
    },
    {
      name: "variable",
      isCorrect: true,
      explanation:
        "A variable stores the longest word found so far as you loop.",
    },
    {
      name: ".length",
      isCorrect: true,
      explanation:
        "You compare word lengths using the .length property of strings.",
    },
    {
      name: "if",
      isCorrect: true,
      explanation:
        "An if statement checks whether the current word is longer than the stored one.",
    },
    {
      name: "comparison (>)",
      isCorrect: true,
      explanation:
        "You compare lengths with > to find which word is longer.",
    },
    {
      name: "template literal",
      isCorrect: false,
      explanation:
        "Template literals embed values in strings. You're comparing lengths, not building strings.",
    },
    {
      name: "modulo (%)",
      isCorrect: false,
      explanation:
        "Modulo checks divisibility. You're comparing lengths, not checking remainders.",
    },
  ],
  systemHint:
    "You need to remember the longest word so far (variable), go through each item (loop), and compare lengths (if + .length). This is called the 'tracker pattern' -- you loop through a list while tracking the best match.",
  starterCode: `function longestWord(words) {
  // Step 1: Create a variable to store the longest word (start with the first one)
  // Step 2: Loop through the array starting from the second word
  // Step 3: If the current word is longer, update your variable
  // Step 4: After the loop, return the longest word
}`,
  solutionCode: `function longestWord(words) {
  let longest = words[0];

  for (let i = 1; i < words.length; i++) {
    if (words[i].length > longest.length) {
      longest = words[i];
    }
  }

  return longest;
}`,
  explanation:
    "You used the tracker pattern: start with an initial guess, loop through everything, and update your tracker whenever you find something better. This same pattern works for finding the smallest number, the cheapest item, the oldest person -- any time you need to find 'the most' or 'the least' of something in a list.",
  testCases: [
    {
      input: 'longestWord(["cat", "elephant", "dog"])',
      expected: '"elephant"',
    },
    {
      input: 'longestWord(["hi", "hey", "hello"])',
      expected: '"hello"',
    },
    {
      input: 'longestWord(["same", "size", "word"])',
      expected: '"same"',
    },
    {
      input: 'longestWord(["only"])',
      expected: '"only"',
    },
    {
      input: 'longestWord(["a", "bb", "ccc", "dd"])',
      expected: '"ccc"',
    },
  ],
  patternsUnlocked: [
    {
      name: "Tracker",
      plainEnglish:
        "Find the best/biggest/smallest in a list by saving the first item, looping and comparing, and updating when you find a better match.",
      codeExample: "let best = arr[0]; for (...) { if (arr[i] > best) best = arr[i]; }",
    },
  ],
};
