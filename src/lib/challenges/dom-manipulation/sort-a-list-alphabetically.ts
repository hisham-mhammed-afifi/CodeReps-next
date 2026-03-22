import type { ChallengeDefinition } from "@/types/challenge";

export const sortAListAlphabetically: ChallengeDefinition = {
  id: "dom-challenge-12",
  slug: "sort-a-list-alphabetically",
  title: "Sort a List Alphabetically",
  trackSlug: "dom-manipulation",
  order: 12,
  difficulty: "advanced",
  estimatedMinutes: 12,
  requiresPreview: true,
  problemStatement:
    "Write a function called `sortList` that takes the ID of a `<ul>`, reads all its `<li>` text contents, sorts them alphabetically, and re-renders the list in sorted order.",
  exampleCalls:
    '// Before: [Cherry, Apple, Banana, Date]\nsortList("fruits");\n// After: [Apple, Banana, Cherry, Date]',
  expectedUnderstanding:
    "I need to read what's currently displayed in the list, sort that data alphabetically, clear the list, and put the items back in sorted order.",
  breakdownBlocks: [
    { id: "block-1", text: "Select the ul element by its ID", order: 1 },
    { id: "block-2", text: "Get all li children inside it", order: 2 },
    { id: "block-3", text: "Extract the text content of each li into an array", order: 3 },
    { id: "block-4", text: "Sort the array alphabetically", order: 4 },
    { id: "block-5", text: "Clear the ul", order: 5 },
    { id: "block-6", text: "Loop through the sorted array and create new li elements", order: 6 },
    { id: "block-7", text: "Append each to the ul", order: 7 },
  ],
  conceptOptions: [
    {
      name: "document.getElementById()",
      isCorrect: true,
      explanation: "getElementById finds the ul by its ID.",
    },
    {
      name: "Array.from()",
      isCorrect: true,
      explanation: "Array.from converts the NodeList of li elements into a real array.",
    },
    {
      name: ".map()",
      isCorrect: true,
      explanation: ".map extracts the textContent from each li into a new array.",
    },
    {
      name: ".sort()",
      isCorrect: true,
      explanation: ".sort orders the text array alphabetically.",
    },
    {
      name: '.innerHTML = ""',
      isCorrect: true,
      explanation: "innerHTML = '' clears the list before re-rendering.",
    },
    {
      name: "document.createElement()",
      isCorrect: true,
      explanation: "createElement builds new li elements for the sorted data.",
    },
    {
      name: ".appendChild()",
      isCorrect: true,
      explanation: "appendChild attaches each new li to the ul.",
    },
    {
      name: ".querySelectorAll()",
      isCorrect: false,
      explanation: "querySelectorAll works, but the ul element's children are already accessible.",
    },
  ],
  systemHint:
    "This challenge goes in reverse compared to 'render from data'. Usually you start with data and build DOM. Here you start with DOM and extract data. The flow is: **DOM to data** (read text), **process data** (sort), **data to DOM** (re-render). This read-process-write cycle is a very common pattern when you need to transform existing page content.",
  starterCode: `function sortList(listId) {
  // Step 1: Select the ul by ID
  // Step 2: Get all li elements inside it
  // Step 3: Extract their text into an array
  //         (hint: Array.from(items).map(item => item.textContent))
  // Step 4: Sort the array alphabetically
  // Step 5: Clear the ul
  // Step 6: Loop through sorted array, create li for each, append
}`,
  solutionCode: `function sortList(listId) {
  const ul = document.getElementById(listId);
  const items = ul.querySelectorAll("li");

  const texts = Array.from(items).map(function (item) {
    return item.textContent;
  });

  texts.sort();

  ul.innerHTML = "";

  for (let i = 0; i < texts.length; i++) {
    const li = document.createElement("li");
    li.textContent = texts[i];
    ul.appendChild(li);
  }
}`,
  explanation:
    "You just did the full **read-process-write cycle**: extract data from the DOM, transform it (sort), then write it back. This is how search results get reordered, how table columns become sortable, and how filter-and-sort UIs work. Notice you used `.map()` (from Track 1) to transform a list of elements into a list of strings. Patterns compound: Track 1 skills power Track 2 solutions.",
  testCases: [
    {
      input: 'sortList("fruits")',
      expected: "undefined",
    },
  ],
  domTestCases: [
    {
      label: 'After sorting, first item should be "Apple"',
      selector: "#fruits li:first-child",
      assertion: "textContent",
      expected: "Apple",
    },
    {
      label: 'Second item should be "Banana"',
      selector: "#fruits li:nth-child(2)",
      assertion: "textContent",
      expected: "Banana",
    },
    {
      label: 'Third item should be "Cherry"',
      selector: "#fruits li:nth-child(3)",
      assertion: "textContent",
      expected: "Cherry",
    },
    {
      label: 'Fourth item should be "Date"',
      selector: "#fruits li:nth-child(4)",
      assertion: "textContent",
      expected: "Date",
    },
    {
      label: 'Fifth item should be "Elderberry"',
      selector: "#fruits li:nth-child(5)",
      assertion: "textContent",
      expected: "Elderberry",
    },
  ],
  starterHTML: `<ul id="fruits">
  <li>Cherry</li>
  <li>Apple</li>
  <li>Banana</li>
  <li>Date</li>
  <li>Elderberry</li>
</ul>`,
  starterCSS: `#fruits {
  font-family: Inter, system-ui, sans-serif;
  list-style: decimal;
  padding-left: 1.5rem;
  margin: 2rem auto;
  max-width: 320px;
}
#fruits li {
  padding: 0.5rem 0.25rem;
  color: #0f172a;
  border-bottom: 1px solid #f1f5f9;
}`,
  patternsUnlocked: [
    {
      name: "Read-process-write",
      plainEnglish:
        "Read from the DOM, process, and write back: extract data from elements, transform it, clear container, re-render.",
      codeExample: `const texts = Array.from(items).map(el => el.textContent);\ntexts.sort();\ncontainer.innerHTML = "";\ntexts.forEach(t => {\n  const li = document.createElement("li");\n  li.textContent = t;\n  container.appendChild(li);\n});`,
    },
  ],
};
