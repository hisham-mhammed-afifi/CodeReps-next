import type { ChallengeDefinition } from "@/types/challenge";

export const chainOfTransformations: ChallengeDefinition = {
  id: "challenge-15",
  slug: "chain-of-transformations",
  title: "Chain of Transformations",
  trackSlug: "track-1-fundamentals",
  order: 15,
  difficulty: "advanced",
  estimatedMinutes: 12,
  problemStatement:
    'Write a function called `processOrders` that takes an array of order objects and returns the total revenue from completed orders only. Each order has a `status` ("completed" or "pending") and a `total` (number).',
  exampleCalls:
    'const orders = [\n  { id: 1, status: "completed", total: 50 },\n  { id: 2, status: "pending", total: 30 },\n  { id: 3, status: "completed", total: 100 },\n  { id: 4, status: "pending", total: 20 },\n  { id: 5, status: "completed", total: 75 }\n];\n\nprocessOrders(orders) --> 225',
  expectedUnderstanding:
    "I need to go through the orders, pick only the completed ones, and add up their totals.",
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Start a revenue variable at 0",
      order: 1,
    },
    {
      id: "block-2",
      text: "Loop through each order",
      order: 2,
    },
    {
      id: "block-3",
      text: 'Check if the order\'s status is "completed"',
      order: 3,
    },
    {
      id: "block-4",
      text: "If yes, add the order's total to revenue",
      order: 4,
    },
    {
      id: "block-5",
      text: "Return revenue",
      order: 5,
    },
  ],
  conceptOptions: [
    {
      name: "for loop",
      isCorrect: true,
      explanation: "A loop lets you go through each order in the array.",
    },
    {
      name: "if",
      isCorrect: true,
      explanation:
        'An if statement checks whether each order\'s status is "completed".',
    },
    {
      name: "comparison (===)",
      isCorrect: true,
      explanation:
        'Strict equality checks if the status is exactly "completed".',
    },
    {
      name: "addition (+=)",
      isCorrect: true,
      explanation: "+= adds the order's total to the running revenue sum.",
    },
    {
      name: "object property (.status, .total)",
      isCorrect: true,
      explanation:
        "Dot notation accesses the status and total properties of each order object.",
    },
    {
      name: ".filter()",
      isCorrect: true,
      explanation:
        ".filter() can select only completed orders -- the functional approach.",
    },
    {
      name: ".reduce()",
      isCorrect: true,
      explanation:
        ".reduce() can sum up the totals of filtered orders -- the functional approach.",
    },
    {
      name: ".push()",
      isCorrect: false,
      explanation:
        "You're calculating a total number, not building an array of results.",
    },
    {
      name: ".includes()",
      isCorrect: false,
      explanation:
        'You\'re comparing a property to a string ("completed"), not searching within a list.',
    },
  ],
  systemHint:
    "This challenge combines multiple patterns you've learned: conditional accumulation (add only if a condition is met) plus object property access (reading .status and .total from each order). In real apps, this is exactly how you process data: filter by a condition, then compute a result from the filtered items.",
  starterCode: `function processOrders(orders) {
  // Step 1: Create a revenue variable at 0
  // Step 2: Loop through each order
  // Step 3: If the order's status is "completed"
  // Step 4: Add its total to revenue
  // Step 5: Return revenue
}`,
  solutionCode: `function processOrders(orders) {
  let revenue = 0;

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].status === "completed") {
      revenue += orders[i].total;
    }
  }

  return revenue;
}`,
  explanation:
    "This is the filter-then-compute pattern and it's the most common data processing pattern in frontend development. Almost every real app does this: show only active users, calculate total sales this month, count unread messages. You're combining two patterns into a pipeline: first narrow down the data, then extract what you need. The functional style with .filter().reduce() reads like a sentence: 'filter completed orders, then reduce to total'.",
  testCases: [
    {
      input:
        'processOrders([{ id: 1, status: "completed", total: 50 }, { id: 2, status: "pending", total: 30 }, { id: 3, status: "completed", total: 100 }])',
      expected: "150",
    },
    {
      input: "processOrders([])",
      expected: "0",
    },
    {
      input:
        'processOrders([{ id: 1, status: "pending", total: 999 }])',
      expected: "0",
    },
    {
      input:
        'processOrders([{ id: 1, status: "completed", total: 42 }])',
      expected: "42",
    },
  ],
  patternsUnlocked: [
    {
      name: "Filter-then-compute",
      plainEnglish:
        "Process only some items and compute a result by narrowing down with a condition, then accumulating or transforming.",
      codeExample:
        'orders.filter(o => o.status === "completed").reduce((sum, o) => sum + o.total, 0)',
    },
  ],
};
