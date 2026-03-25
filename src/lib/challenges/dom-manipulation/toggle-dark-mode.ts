import type { ChallengeDefinition } from "@/types/challenge";

export const toggleDarkMode: ChallengeDefinition = {
  id: "dom-challenge-04",
  slug: "toggle-dark-mode",
  title: "Toggle Dark Mode",
  trackSlug: "dom-manipulation",
  order: 4,
  difficulty: "beginner",
  estimatedMinutes: 8,
  requiresPreview: true,
  problemStatement:
    'Write two functions:\n\n1. `toggleDarkMode()` -- toggles the class `"dark"` on the `<body>` element\n2. `isDarkMode()` -- returns `true` if dark mode is currently active, `false` otherwise',
  exampleCalls:
    'isDarkMode();       // false (starts without dark class)\ntoggleDarkMode();   // adds "dark" class to body\nisDarkMode();       // true\ntoggleDarkMode();   // removes "dark" class\nisDarkMode();       // false',
  expectedUnderstanding:
    "I need to add or remove a CSS class on the body element. If the class is there, remove it. If it's not there, add it. I also need a way to check whether the class is currently present.",
  breakdownBlocks: [
    { id: "block-1", text: "For toggleDarkMode: select the body element", order: 1 },
    { id: "block-2", text: 'Toggle the "dark" class on it (add if missing, remove if present)', order: 2 },
    { id: "block-3", text: "For isDarkMode: select the body element", order: 3 },
    { id: "block-4", text: 'Check if it contains the "dark" class', order: 4 },
    { id: "block-5", text: "Return true or false", order: 5 },
  ],
  conceptOptions: [
    {
      name: "document.body",
      isCorrect: true,
      explanation: "document.body is a shortcut to access the <body> element directly.",
    },
    {
      name: ".classList.toggle()",
      isCorrect: true,
      explanation: "classList.toggle adds the class if missing and removes it if present.",
    },
    {
      name: ".classList.contains()",
      isCorrect: true,
      explanation: "classList.contains checks whether an element has a specific class.",
    },
    {
      name: ".classList.add()",
      isCorrect: false,
      explanation: "add only adds the class. You need toggle to also remove it.",
    },
    {
      name: ".classList.remove()",
      isCorrect: false,
      explanation: "remove only removes the class. Toggle handles both add and remove.",
    },
    {
      name: 'document.querySelector("body")',
      isCorrect: false,
      explanation: "This works but document.body is simpler and more direct.",
    },
  ],
  systemHint:
    "JavaScript controls how things look by adding and removing CSS classes, not by writing CSS directly. `.classList.toggle('dark')` is a shortcut that checks: 'Does this class exist? If yes, remove it. If no, add it.' This is exactly how theme switchers, dropdown menus, and mobile nav toggles work in real apps.",
  starterCode: `function toggleDarkMode() {
  // Step 1: Select the body element (hint: document.body is a shortcut)
  // Step 2: Toggle the "dark" class on it
}

function isDarkMode() {
  // Step 1: Select the body element
  // Step 2: Check if it has the "dark" class
  // Step 3: Return true or false
}`,
  solutionCode: `function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function isDarkMode() {
  return document.body.classList.contains("dark");
}`,
  explanation:
    'This is the **toggle state pattern**. Instead of tracking state in a variable (like `let isDark = false`), you\'re using the DOM itself as the source of truth. The CSS class IS the state. This is a common approach in vanilla JS: add a class to change appearance, check for the class to know the current state. Real-world uses include theme switching, showing/hiding menus, expanding/collapsing sections, and marking items as selected.',
  testCases: [
    {
      input: "isDarkMode()",
      expected: "false",
    },
    {
      input: "toggleDarkMode(); isDarkMode()",
      expected: "true",
    },
    {
      input: "toggleDarkMode(); isDarkMode()",
      expected: "false",
    },
    {
      input: "toggleDarkMode(); toggleDarkMode(); toggleDarkMode(); isDarkMode()",
      expected: "true",
    },
  ],
  domTestCases: [
    {
      label: 'After toggleDarkMode(), body should have "dark" class',
      selector: "body",
      assertion: "classList",
      expected: "dark",
    },
  ],
  starterHTML: `<body>
  <div id="page">
    <h1>Toggle Dark Mode</h1>
    <p>Click the button to switch themes.</p>
    <button id="theme-btn">Toggle Theme</button>
  </div>
</body>`,
  starterCSS: `#page {
  font-family: Inter, system-ui, sans-serif;
  max-width: 480px;
  margin: 2rem auto;
  padding: 1.5rem;
  transition: background 0.3s, color 0.3s;
}
h1 { color: #0f172a; margin-bottom: 0.5rem; }
p { color: #475569; margin-bottom: 1rem; }
#theme-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #94a3b8;
  border-radius: 0.5rem;
  background: #fff;
  cursor: pointer;
  font-size: 0.875rem;
}
body.dark {
  background: #0f172a;
}
body.dark #page { color: #f1f5f9; }
body.dark h1 { color: #f1f5f9; }
body.dark p { color: #94a3b8; }
body.dark #theme-btn {
  background: #1e293b;
  color: #f1f5f9;
  border-color: #475569;
}`,
  patternsUnlocked: [
    {
      name: "Toggle state",
      plainEnglish:
        'Switch something on/off with a class: element.classList.toggle("className") to switch, .classList.contains("className") to check.',
      codeExample: `element.classList.toggle("active");\nconst isActive = element.classList.contains("active");`,
    },
  ],
};
