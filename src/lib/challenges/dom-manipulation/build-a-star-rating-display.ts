import type { ChallengeDefinition } from "@/types/challenge";

export const buildAStarRatingDisplay: ChallengeDefinition = {
  id: "dom-challenge-14",
  slug: "build-a-star-rating-display",
  title: "Build a Star Rating Display",
  trackSlug: "dom-manipulation",
  order: 14,
  difficulty: "advanced",
  estimatedMinutes: 12,
  requiresPreview: true,
  problemStatement:
    'Write a function called `renderStars` that takes a `rating` (number of filled stars) and `maxStars` (total stars), then renders a star rating inside `#rating-container`. Use `<span>` elements with class `"star-filled"` or `"star-empty"`. Use a DocumentFragment to build all stars before inserting them at once.',
  exampleCalls:
    "renderStars(3, 5);\n// Renders: [filled] [filled] [filled] [empty] [empty]\n// 3 spans with \"star-filled\", 2 spans with \"star-empty\"",
  expectedUnderstanding:
    "I need to create a row of star indicators. The first N stars are filled (where N is the rating), and the rest are empty. I should build them all off-screen first, then add them to the page in one shot.",
  breakdownBlocks: [
    { id: "block-1", text: "Select #rating-container and clear it", order: 1 },
    { id: "block-2", text: "Create a DocumentFragment (an invisible, off-screen container)", order: 2 },
    { id: "block-3", text: "Loop from 1 to maxStars", order: 3 },
    { id: "block-4", text: "For each iteration, create a span", order: 4 },
    { id: "block-5", text: 'If the current number is less than or equal to rating, add class "star-filled"', order: 5 },
    { id: "block-6", text: 'Otherwise, add class "star-empty"', order: 6 },
    { id: "block-7", text: "Append the span to the fragment (not the page yet)", order: 7 },
    { id: "block-8", text: "After the loop, append the entire fragment to #rating-container (one insert)", order: 8 },
  ],
  conceptOptions: [
    {
      name: "document.createDocumentFragment()",
      isCorrect: true,
      explanation: "A DocumentFragment lets you build elements off-screen before inserting them all at once.",
    },
    {
      name: "document.createElement()",
      isCorrect: true,
      explanation: "createElement builds each star span.",
    },
    {
      name: ".classList.add()",
      isCorrect: true,
      explanation: "classList.add assigns the filled or empty class to each star.",
    },
    {
      name: ".appendChild()",
      isCorrect: true,
      explanation: "appendChild attaches stars to the fragment, then the fragment to the container.",
    },
    {
      name: "for loop",
      isCorrect: true,
      explanation: "A loop creates the correct number of stars.",
    },
    {
      name: "if/else",
      isCorrect: true,
      explanation: "if/else decides whether each star is filled or empty based on its position.",
    },
    {
      name: "document.querySelector()",
      isCorrect: true,
      explanation: "querySelector finds the rating container.",
    },
  ],
  systemHint:
    "A `DocumentFragment` is like an invisible container. You can append elements to it without triggering any page redraws. When you're done building, you append the fragment itself, and all its children get inserted at once. This is a performance optimization: 10 individual appends cause 10 redraws, but building in a fragment and appending once causes only 1. For small lists it doesn't matter much, but it's a habit worth building early.",
  starterCode: `function renderStars(rating, maxStars) {
  // Step 1: Select #rating-container and clear it
  // Step 2: Create a DocumentFragment
  // Step 3: Loop from 1 to maxStars
  // Step 4: Create a span for each star
  // Step 5: Add "star-filled" or "star-empty" class based on position
  // Step 6: Append span to the fragment
  // Step 7: After the loop, append the fragment to the container
}`,
  solutionCode: `function renderStars(rating, maxStars) {
  const container = document.querySelector("#rating-container");
  container.innerHTML = "";

  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= maxStars; i++) {
    const star = document.createElement("span");

    if (i <= rating) {
      star.classList.add("star-filled");
      star.textContent = "\\u2605";
    } else {
      star.classList.add("star-empty");
      star.textContent = "\\u2606";
    }

    fragment.appendChild(star);
  }

  container.appendChild(fragment);
}`,
  explanation:
    "You used the **fragment batching pattern**. Instead of appending each star directly to the page (which triggers a redraw each time), you built everything inside a DocumentFragment first. When you append the fragment, all its children move to the page in one operation. The fragment itself disappears. It's like building a ship in a bottle: assemble inside, then place. This is a stepping stone to understanding why React's virtual DOM exists. It batches changes for the same reason: fewer DOM updates = better performance.",
  testCases: [
    {
      input: "renderStars(3, 5)",
      expected: "undefined",
    },
    {
      input: "renderStars(0, 5)",
      expected: "undefined",
    },
  ],
  domTestCases: [
    {
      label: "Should have 5 spans total",
      selector: "#rating-container",
      assertion: "childCount",
      expected: 5,
    },
    {
      label: "Should have 3 filled stars",
      selector: "#rating-container .star-filled",
      assertion: "exists",
      expected: true,
    },
    {
      label: "Should have 2 empty stars",
      selector: "#rating-container .star-empty",
      assertion: "exists",
      expected: true,
    },
  ],
  starterHTML: `<div id="rating-container"></div>`,
  starterCSS: `#rating-container {
  font-family: Inter, system-ui, sans-serif;
  max-width: 320px;
  margin: 2rem auto;
  padding: 1rem;
  display: flex;
  gap: 0.25rem;
  font-size: 2rem;
}
.star-filled {
  color: #f59e0b;
}
.star-empty {
  color: #e2e8f0;
}`,
  patternsUnlocked: [
    {
      name: "Fragment batching",
      plainEnglish:
        "Build multiple elements off-screen, then insert all at once: document.createDocumentFragment() > build inside > container.appendChild(fragment).",
      codeExample: `const frag = document.createDocumentFragment();\nfor (let i = 0; i < 5; i++) {\n  const el = document.createElement("span");\n  frag.appendChild(el);\n}\ncontainer.appendChild(frag);`,
    },
  ],
};
