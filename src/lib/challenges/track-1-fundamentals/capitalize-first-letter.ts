import type { ChallengeDefinition } from "@/types/challenge";

export const capitalizeFirstLetter: ChallengeDefinition = {
  id: "challenge-10",
  slug: "capitalize-first-letter",
  title: "Capitalize First Letter",
  trackSlug: "track-1-fundamentals",
  order: 10,
  difficulty: "intermediate",
  estimatedMinutes: 8,
  problemStatement:
    "Write a function called `capitalizeFirst` that takes a string and returns it with the first letter capitalized and the rest unchanged.",
  exampleCalls:
    'capitalizeFirst("hello")      --> "Hello"\ncapitalizeFirst("javaScript") --> "JavaScript"\ncapitalizeFirst("a")           --> "A"',
  expectedUnderstanding:
    "I need to take the first character, make it uppercase, and then attach the rest of the string to it.",
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Get the first character of the string",
      order: 1,
    },
    {
      id: "block-2",
      text: "Convert it to uppercase",
      order: 2,
    },
    {
      id: "block-3",
      text: "Get the rest of the string (everything after the first character)",
      order: 3,
    },
    {
      id: "block-4",
      text: "Combine them together",
      order: 4,
    },
    {
      id: "block-5",
      text: "Return the result",
      order: 5,
    },
  ],
  conceptOptions: [
    {
      name: "string[0]",
      isCorrect: true,
      explanation:
        "Bracket notation accesses the first character of the string.",
    },
    {
      name: ".toUpperCase()",
      isCorrect: true,
      explanation:
        ".toUpperCase() converts the first character to uppercase.",
    },
    {
      name: ".slice()",
      isCorrect: true,
      explanation:
        ".slice(1) gets everything from index 1 onward -- the rest of the string.",
    },
    {
      name: "string concatenation (+)",
      isCorrect: true,
      explanation:
        "The + operator joins the uppercase first letter with the rest of the string.",
    },
    {
      name: "return",
      isCorrect: true,
      explanation: "Return sends the capitalized string back to the caller.",
    },
    {
      name: "for loop",
      isCorrect: false,
      explanation:
        "You don't need a loop -- you're only changing one character, not iterating through all of them.",
    },
    {
      name: ".push()",
      isCorrect: false,
      explanation:
        ".push() adds to arrays. You're manipulating a string, not building an array.",
    },
  ],
  systemHint:
    "Strings in JS are like arrays -- you can access individual characters with string[0]. Use .slice(1) to get everything from index 1 onward. Then combine the uppercase first letter with the rest. This is the split-transform-join pattern: break something apart, change one piece, put it back together.",
  starterCode: `function capitalizeFirst(text) {
  // Step 1: Get the first character and make it uppercase
  // Step 2: Get the rest of the string (from index 1 onward)
  // Step 3: Combine them and return
}`,
  solutionCode: `function capitalizeFirst(text) {
  return text[0].toUpperCase() + text.slice(1);
}`,
  explanation:
    "You used the split-transform-join pattern: isolate the part you want to change, transform it, and reassemble. This pattern is everywhere in string manipulation -- formatting names, cleaning user input, building URLs. Notice how .slice(1) gives you 'everything from index 1 to the end' without needing to specify the end.",
  testCases: [
    {
      input: 'capitalizeFirst("hello")',
      expected: '"Hello"',
    },
    {
      input: 'capitalizeFirst("javaScript")',
      expected: '"JavaScript"',
    },
    {
      input: 'capitalizeFirst("a")',
      expected: '"A"',
    },
    {
      input: 'capitalizeFirst("HELLO")',
      expected: '"HELLO"',
    },
    {
      input: 'capitalizeFirst("123abc")',
      expected: '"123abc"',
    },
  ],
  patternsUnlocked: [
    {
      name: "Split-transform-join",
      plainEnglish:
        "Change one part of a string by extracting it, transforming it, and recombining.",
      codeExample: "str[0].toUpperCase() + str.slice(1)",
    },
  ],
};
