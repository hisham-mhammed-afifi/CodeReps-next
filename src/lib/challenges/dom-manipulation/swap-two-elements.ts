import type { ChallengeDefinition } from "@/types/challenge";

export const swapTwoElements: ChallengeDefinition = {
  id: "dom-challenge-08",
  slug: "swap-two-elements",
  title: "Swap Two Elements",
  trackSlug: "dom-manipulation",
  order: 8,
  difficulty: "intermediate",
  estimatedMinutes: 15,
  requiresPreview: true,
  problemStatement:
    "Write a function called `swapElements` that takes two CSS selectors and swaps the positions of those two elements in the DOM. Their parent containers stay the same.",
  exampleCalls:
    '// Before: [Item A] [Item B] [Item C]\nswapElements("#item-a", "#item-c");\n// After: [Item C] [Item B] [Item A]',
  expectedUnderstanding:
    "I need to find two elements and make them switch places. Whatever was in position 1 goes to position 2, and vice versa. The other elements stay where they are.",
  breakdownBlocks: [
    { id: "block-1", text: "Select both elements by their selectors", order: 1 },
    { id: "block-2", text: "Save a reference to the next sibling of the second element (so we know where to insert)", order: 2 },
    { id: "block-3", text: "Get the parent of the second element", order: 3 },
    { id: "block-4", text: "Put the first element where the second element was", order: 4 },
    { id: "block-5", text: "Put the second element where the first element was", order: 5 },
  ],
  conceptOptions: [
    {
      name: "document.querySelector()",
      isCorrect: true,
      explanation: "querySelector finds each element by its CSS selector.",
    },
    {
      name: ".parentElement",
      isCorrect: true,
      explanation: "parentElement gives you the parent node of an element.",
    },
    {
      name: ".nextSibling",
      isCorrect: true,
      explanation: "nextSibling gives you a reference to the next node after an element.",
    },
    {
      name: ".insertBefore()",
      isCorrect: true,
      explanation: "insertBefore places an element before a specific sibling in the parent.",
    },
    {
      name: ".appendChild()",
      isCorrect: false,
      explanation: "appendChild only adds to the end. insertBefore is needed for precise positioning.",
    },
  ],
  systemHint:
    "Swapping is tricky because moving an element automatically removes it from its old position. You need a 'bookmark' to remember where things were. The trick: save the `nextSibling` of one element before moving anything. Then use `insertBefore` to place elements at specific positions. This teaches you that DOM elements have a physical order relative to their siblings.",
  starterCode: `function swapElements(selector1, selector2) {
  // Step 1: Select both elements
  // Step 2: Save the parent and nextSibling of element2 (as a bookmark)
  // Step 3: Insert element1 before the bookmark (moves it to element2's old position)
  // Step 4: Insert element2 where element1 was
  // Hint: if element1 has no nextSibling, use appendChild on its parent
}`,
  solutionCode: `function swapElements(selector1, selector2) {
  const el1 = document.querySelector(selector1);
  const el2 = document.querySelector(selector2);

  const parent1 = el1.parentElement;
  const next1 = el1.nextSibling;

  const parent2 = el2.parentElement;
  const next2 = el2.nextSibling;

  if (next2) {
    parent2.insertBefore(el1, next2);
  } else {
    parent2.appendChild(el1);
  }

  if (next1) {
    parent1.insertBefore(el2, next1);
  } else {
    parent1.appendChild(el2);
  }
}`,
  explanation:
    "You used the **parent-child navigation pattern**. DOM elements aren't just floating in space. Each one has a parent (`.parentElement`), and siblings (`.nextSibling`, `.previousSibling`). When you move an element with `insertBefore` or `appendChild`, it's automatically removed from its old position. That's why you need to save the 'bookmark' (nextSibling) BEFORE moving anything. This concept of navigating the DOM tree is essential for building drag-and-drop, reorderable lists, and any UI that rearranges content.",
  testCases: [
    {
      input: 'swapElements("#item-a", "#item-c"); document.querySelector("#list li:first-child").textContent',
      expected: '"Item C"',
    },
    {
      input: 'document.querySelector("#list li:nth-child(3)").textContent',
      expected: '"Item A"',
    },
  ],
  domTestCases: [
    {
      label: 'After swapping A and C, first item should be "Item C"',
      selector: "#list li:first-child",
      assertion: "textContent",
      expected: "Item C",
    },
    {
      label: 'Second item should still be "Item B"',
      selector: "#list li:nth-child(2)",
      assertion: "textContent",
      expected: "Item B",
    },
    {
      label: 'Third item should be "Item A"',
      selector: "#list li:nth-child(3)",
      assertion: "textContent",
      expected: "Item A",
    },
    {
      label: 'Fourth item should still be "Item D"',
      selector: "#list li:nth-child(4)",
      assertion: "textContent",
      expected: "Item D",
    },
  ],
  starterHTML: `<ul id="list">
  <li id="item-a">Item A</li>
  <li id="item-b">Item B</li>
  <li id="item-c">Item C</li>
  <li id="item-d">Item D</li>
</ul>`,
  starterCSS: `#list {
  font-family: Inter, system-ui, sans-serif;
  list-style: none;
  padding: 0;
  margin: 2rem auto;
  max-width: 320px;
}
#list li {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  color: #0f172a;
  font-weight: 500;
}`,
  patternsUnlocked: [
    {
      name: "Parent-child navigation",
      plainEnglish:
        "Navigate the DOM tree: .parentElement, .nextSibling, .children, .insertBefore() to read and rearrange element positions.",
      codeExample: `const parent = el.parentElement;\nconst next = el.nextSibling;\nparent.insertBefore(newEl, next);`,
    },
  ],
};
