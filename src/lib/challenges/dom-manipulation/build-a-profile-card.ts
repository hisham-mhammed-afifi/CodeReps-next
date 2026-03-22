import type { ChallengeDefinition } from "@/types/challenge";

export const buildAProfileCard: ChallengeDefinition = {
  id: "dom-challenge-02",
  slug: "build-a-profile-card",
  title: "Build a Profile Card",
  trackSlug: "dom-manipulation",
  order: 2,
  difficulty: "beginner",
  estimatedMinutes: 10,
  requiresPreview: true,
  problemStatement:
    'Write a function called `createProfileCard` that takes a `name` and a `role`, creates a profile card from scratch, and adds it to the page inside `#container`.\n\nThe card should be a `<div>` with class `"profile-card"`, containing an `<h2>` with the name and a `<p>` with the role.',
  exampleCalls:
    'createProfileCard("Sara", "Developer");\n// Adds to #container:\n// <div class="profile-card">\n//   <h2>Sara</h2>\n//   <p>Developer</p>\n// </div>',
  expectedUnderstanding:
    "I need to build three HTML elements from scratch using JavaScript (a div, an h2, and a p), put text in them, nest them together, and attach the result to the page.",
  breakdownBlocks: [
    { id: "block-1", text: "Create a <div> element", order: 1 },
    { id: "block-2", text: 'Add the class "profile-card" to the div', order: 2 },
    { id: "block-3", text: "Create an <h2> element and set its text to the name", order: 3 },
    { id: "block-4", text: "Create a <p> element and set its text to the role", order: 4 },
    { id: "block-5", text: "Put the h2 and p inside the div", order: 5 },
    { id: "block-6", text: "Put the div inside #container", order: 6 },
  ],
  conceptOptions: [
    {
      name: "document.createElement()",
      isCorrect: true,
      explanation: "createElement builds a new HTML element in memory.",
    },
    {
      name: ".classList.add()",
      isCorrect: true,
      explanation: "classList.add attaches a CSS class to an element.",
    },
    {
      name: ".textContent",
      isCorrect: true,
      explanation: "textContent sets the text inside an element.",
    },
    {
      name: ".appendChild()",
      isCorrect: true,
      explanation: "appendChild attaches an element as a child of another element.",
    },
    {
      name: "document.querySelector()",
      isCorrect: true,
      explanation: "querySelector finds the #container where the card will go.",
    },
    {
      name: ".innerHTML",
      isCorrect: false,
      explanation:
        "innerHTML sets raw HTML strings. createElement is safer and gives you direct control over each element.",
    },
  ],
  systemHint:
    "`document.createElement('div')` creates a new element in memory, but it's not on the page yet. It's invisible until you attach it somewhere using `.appendChild()`. Think of it as building with LEGO: you snap pieces together, then place the finished structure where it belongs.",
  starterCode: `function createProfileCard(name, role) {
  // Step 1: Create a div element
  // Step 2: Add class "profile-card" to the div
  // Step 3: Create an h2 element and set its text to the name
  // Step 4: Create a p element and set its text to the role
  // Step 5: Append h2 and p inside the div
  // Step 6: Append the div to #container
}`,
  solutionCode: `function createProfileCard(name, role) {
  const card = document.createElement("div");
  card.classList.add("profile-card");

  const nameHeading = document.createElement("h2");
  nameHeading.textContent = name;

  const roleText = document.createElement("p");
  roleText.textContent = role;

  card.appendChild(nameHeading);
  card.appendChild(roleText);

  document.querySelector("#container").appendChild(card);
}`,
  explanation:
    "You just built HTML from scratch using only JavaScript. This is the **create and append pattern**: create an element, configure it (text, classes, attributes), then attach it to the page. The key insight is that `createElement` builds an element in memory. It's floating in space, not visible, until you `appendChild` it somewhere. You'll use this pattern every time you need to add new content to a page dynamically.",
  testCases: [
    {
      input: 'createProfileCard("Sara", "Developer"); document.querySelectorAll("#container .profile-card").length',
      expected: "1",
    },
    {
      input: 'createProfileCard("Ahmed", "Designer"); document.querySelectorAll("#container .profile-card").length',
      expected: "2",
    },
  ],
  domTestCases: [
    {
      label: "Should have 2 profile cards after both calls",
      selector: "#container",
      assertion: "childCount",
      expected: 2,
    },
    {
      label: 'First card h2 should show "Sara"',
      selector: "#container .profile-card:first-child h2",
      assertion: "textContent",
      expected: "Sara",
    },
    {
      label: 'Second card h2 should show "Ahmed"',
      selector: "#container .profile-card:nth-child(2) h2",
      assertion: "textContent",
      expected: "Ahmed",
    },
  ],
  starterHTML: `<div id="container"></div>`,
  starterCSS: `#container {
  font-family: Inter, system-ui, sans-serif;
  max-width: 480px;
  margin: 2rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.profile-card {
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.25rem;
  background: #fff;
}
.profile-card h2 {
  color: #0f172a;
  font-size: 1.25rem;
  margin: 0 0 0.25rem;
}
.profile-card p {
  color: #64748b;
  margin: 0;
}`,
  patternsUnlocked: [
    {
      name: "Create and append",
      plainEnglish:
        "Build a new element and add it to the page: createElement() > configure > appendChild()",
      codeExample: `const el = document.createElement("div");\nel.textContent = "Hello";\ncontainer.appendChild(el);`,
    },
  ],
};
