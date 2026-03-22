import type { ChallengeDefinition } from "@/types/challenge";

export const groupByProperty: ChallengeDefinition = {
  id: "challenge-12",
  slug: "group-by-property",
  title: "Group by Property",
  trackSlug: "track-1-fundamentals",
  order: 12,
  difficulty: "advanced",
  estimatedMinutes: 15,
  problemStatement:
    "Write a function called `groupByAge` that takes an array of person objects and returns an object where the keys are ages and the values are arrays of names.",
  exampleCalls:
    'const people = [\n  { name: "Sara", age: 25 },\n  { name: "Ahmed", age: 30 },\n  { name: "Lina", age: 25 },\n  { name: "Omar", age: 30 },\n  { name: "Noor", age: 20 }\n];\n\ngroupByAge(people)\n// { 25: ["Sara", "Lina"], 30: ["Ahmed", "Omar"], 20: ["Noor"] }',
  expectedUnderstanding:
    "I need to organize people into groups based on their age. Each age becomes a key, and the value is a list of names that share that age.",
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Create an empty object to hold the groups",
      order: 1,
    },
    {
      id: "block-2",
      text: "Loop through each person",
      order: 2,
    },
    {
      id: "block-3",
      text: "Get the person's age",
      order: 3,
    },
    {
      id: "block-4",
      text: "Check if that age already exists as a key in the object",
      order: 4,
    },
    {
      id: "block-5",
      text: "If not, create it with an empty array",
      order: 5,
    },
    {
      id: "block-6",
      text: "Push the person's name into the array for that age",
      order: 6,
    },
    {
      id: "block-7",
      text: "Return the grouped object",
      order: 7,
    },
  ],
  conceptOptions: [
    {
      name: "for loop",
      isCorrect: true,
      explanation: "A loop lets you go through each person in the array.",
    },
    {
      name: "object",
      isCorrect: true,
      explanation:
        "An object stores the groups, with ages as keys and name arrays as values.",
    },
    {
      name: "if",
      isCorrect: true,
      explanation:
        "An if statement checks whether a group for that age already exists.",
    },
    {
      name: "property access []",
      isCorrect: true,
      explanation:
        "Bracket notation uses the age variable as a dynamic key on the groups object.",
    },
    {
      name: ".push()",
      isCorrect: true,
      explanation:
        ".push() adds the person's name to the array for their age group.",
    },
    {
      name: ".sort()",
      isCorrect: false,
      explanation:
        "Sorting arranges items in order. You're grouping, not sorting.",
    },
    {
      name: ".includes()",
      isCorrect: false,
      explanation:
        "You're checking if a key exists in an object, not if a value exists in an array.",
    },
  ],
  systemHint:
    "You're building a lookup object (also called a dictionary or hash map). The key insight is checking 'does this group exist yet?' before adding to it. If not, create it first. This is the grouping pattern and it's used constantly in real apps: group messages by date, group products by category, group transactions by type.",
  starterCode: `function groupByAge(people) {
  // Step 1: Create an empty object for groups
  // Step 2: Loop through each person
  // Step 3: Get the person's age
  // Step 4: If this age doesn't exist as a key yet, create it with an empty array
  // Step 5: Push the person's name into the array for that age
  // Step 6: Return the groups object
}`,
  solutionCode: `function groupByAge(people) {
  const groups = {};

  for (let i = 0; i < people.length; i++) {
    const age = people[i].age;
    const name = people[i].name;

    if (!groups[age]) {
      groups[age] = [];
    }

    groups[age].push(name);
  }

  return groups;
}`,
  explanation:
    "You used the grouping pattern: build an object where keys represent categories and values are arrays of matching items. The if (!groups[age]) check is critical -- it initializes the group the first time you encounter a new category. This is one of the most practical patterns in frontend development: grouping API data for display, organizing form entries, categorizing search results.",
  testCases: [
    {
      input:
        'groupByAge([{ name: "Sara", age: 25 }, { name: "Ahmed", age: 30 }, { name: "Lina", age: 25 }])',
      expected: '{"25": ["Sara", "Lina"], "30": ["Ahmed"]}',
    },
    {
      input: 'groupByAge([{ name: "Solo", age: 99 }])',
      expected: '{"99": ["Solo"]}',
    },
    {
      input: "groupByAge([])",
      expected: "{}",
    },
  ],
  patternsUnlocked: [
    {
      name: "Grouping",
      plainEnglish:
        "Organize items into categories using an object with arrays as values.",
      codeExample:
        "const groups = {}; if (!groups[key]) groups[key] = []; groups[key].push(value);",
    },
  ],
};
