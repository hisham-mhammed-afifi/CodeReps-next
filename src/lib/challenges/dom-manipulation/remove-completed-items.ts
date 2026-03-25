import type { ChallengeDefinition } from "@/types/challenge";

export const removeCompletedItems: ChallengeDefinition = {
  id: "dom-challenge-11",
  slug: "remove-completed-items",
  title: "Remove Completed Items",
  trackSlug: "dom-manipulation",
  order: 11,
  difficulty: "advanced",
  estimatedMinutes: 10,
  requiresPreview: true,
  problemStatement:
    'The page has a `<ul id="tasks">` with several `<li>` elements. Some have class `"done"`. Write a function called `removeDone` that removes all li elements with class "done" from the list and returns the number of items removed.',
  exampleCalls:
    '// Before: [Buy milk (done), Write code, Walk dog (done), Read book]\nremoveDone(); // Returns 2\n// After: [Write code, Read book]',
  expectedUnderstanding:
    'I need to find all list items that have the "done" class, count them, remove each one from the page, and return the count.',
  breakdownBlocks: [
    { id: "block-1", text: 'Select all li elements inside #tasks that have class "done"', order: 1 },
    { id: "block-2", text: "Save the count (to return later)", order: 2 },
    { id: "block-3", text: "Loop through each matching element", order: 3 },
    { id: "block-4", text: "Remove it from the DOM", order: 4 },
    { id: "block-5", text: "Return the count", order: 5 },
  ],
  conceptOptions: [
    {
      name: 'document.querySelectorAll("#tasks li.done")',
      isCorrect: true,
      explanation: "A compound CSS selector finds only the li elements with class done inside #tasks.",
    },
    {
      name: ".forEach()",
      isCorrect: true,
      explanation: "forEach iterates through each matched element to remove it.",
    },
    {
      name: ".remove()",
      isCorrect: true,
      explanation: ".remove() takes an element out of the DOM entirely.",
    },
    {
      name: ".length",
      isCorrect: true,
      explanation: ".length on the NodeList gives the count of matched elements.",
    },
    {
      name: ".classList.contains()",
      isCorrect: false,
      explanation: "You don't need to check classes manually when the CSS selector already filters for you.",
    },
  ],
  systemHint:
    "The CSS selector `#tasks li.done` is powerful: it means 'find li elements with class done that are inside #tasks'. This lets the browser do the filtering for you. Then `.remove()` on each element takes it out of the DOM entirely. Note: `querySelectorAll` returns a static NodeList (a snapshot), so removing elements during a loop is safe. It won't mess up your iteration.",
  starterCode: `function removeDone() {
  // Step 1: Select all li elements with class "done" inside #tasks
  // Step 2: Save the count
  // Step 3: Loop through and remove each one
  // Step 4: Return the count
}`,
  solutionCode: `function removeDone() {
  const doneItems = document.querySelectorAll("#tasks li.done");
  const count = doneItems.length;

  doneItems.forEach(function (item) {
    item.remove();
  });

  return count;
}`,
  explanation:
    'You combined CSS selectors with DOM removal. The selector `#tasks li.done` does the filtering work that you would have needed a loop + if statement for. Then `.remove()` is the simplest way to take an element off the page entirely. This is different from hiding (which keeps the element in the DOM but invisible). Removing is permanent. Real-world uses: clearing notifications, removing items from a cart, deleting messages.',
  testCases: [
    {
      input: "removeDone()",
      expected: "3",
    },
    {
      input: "removeDone()",
      expected: "0",
    },
  ],
  domTestCases: [
    {
      label: "After removeDone(), only 2 items should remain",
      selector: "#tasks",
      assertion: "childCount",
      expected: 2,
    },
    {
      label: 'First remaining item should be "Write code"',
      selector: "#tasks li:first-child",
      assertion: "textContent",
      expected: "Write code",
    },
    {
      label: 'Second remaining item should be "Read a book"',
      selector: "#tasks li:nth-child(2)",
      assertion: "textContent",
      expected: "Read a book",
    },
    {
      label: "No items with done class should remain",
      selector: "#tasks li.done",
      assertion: "exists",
      expected: false,
    },
  ],
  starterHTML: `<ul id="tasks">
  <li class="done">Buy milk</li>
  <li>Write code</li>
  <li class="done">Walk the dog</li>
  <li>Read a book</li>
  <li class="done">Clean house</li>
</ul>`,
  starterCSS: `#tasks {
  font-family: Inter, system-ui, sans-serif;
  list-style: none;
  padding: 0;
  margin: 2rem auto;
  max-width: 400px;
}
#tasks li {
  padding: 0.625rem 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  color: #0f172a;
}
#tasks li.done {
  text-decoration: line-through;
  color: #94a3b8;
  background: #f8fafc;
}`,
  patternsUnlocked: [
    {
      name: "DOM removal",
      plainEnglish:
        "Remove elements that match a condition: select with a specific CSS selector, then .remove() each matched element.",
      codeExample: `const done = document.querySelectorAll(".done");\ndone.forEach(el => el.remove());`,
    },
  ],
};
