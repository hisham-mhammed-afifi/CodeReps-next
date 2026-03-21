# Track 2: DOM Manipulation -- Challenge Design Document

## Platform Philosophy

Every challenge follows the **5-Step Problem-Solving Framework**:

1. **Understand** -- Rewrite the problem in plain English
2. **Break Down** -- Split it into smaller steps
3. **Map to Code** -- Match each step to a JS/DOM concept
4. **Write** -- Code the solution
5. **Verify** -- Test against expected output AND check the live DOM preview

Each challenge has 3 difficulty modes:

- **Guided**: All 5 steps are shown and interactive
- **Semi-Guided**: Steps 1-3 are available as optional hints
- **Independent**: Just the problem and the editor

**What's new in Track 2:**
- Every challenge includes **Starter HTML** (the page the student manipulates)
- A **Live Preview Panel** shows the DOM result after each run
- Tests check both return values AND the visual DOM state

---

## Challenge 01: Change the Headline

### Problem Statement

A page has an `<h1 id="title">` with the text "Welcome". Write a function called `updateHeadline` that takes a string and changes the headline text to that string.

**Example:**

```
updateHeadline("Hello CodeReps")
// The h1 now shows "Hello CodeReps"

updateHeadline("New Title")
// The h1 now shows "New Title"
```

### Starter HTML

```html
<div id="page">
  <h1 id="title">Welcome</h1>
  <p>This is a sample page. Change the headline above!</p>
</div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to find the h1 element on the page and replace its text with the new text that was passed into the function.

### Step 2: Break Down

**Guided blocks:**

1. Find the h1 element using its ID
2. Change its text content to the new text

### Step 3: Map to Code

**Options shown:** `document.getElementById()`, `document.querySelector()`, `.textContent`, `.innerHTML`, `.innerText`

**Correct picks:** `document.querySelector()` (or `getElementById`), `.textContent`

**System hint:** "To grab an element from the page, use `document.querySelector('#id')` with a CSS selector, or `document.getElementById('id')` with just the ID. To change the text inside it, set `.textContent`. We prefer `.textContent` over `.innerHTML` because it's safer (no HTML injection) and faster."

### Step 4: Starter Code

```javascript
function updateHeadline(newText) {
  // Step 1: Find the h1 element with id "title"
  // Step 2: Change its text content to newText
}
```

### Step 5: Verify

**Test cases:**

```javascript
updateHeadline("Hello CodeReps");
document.querySelector("#title").textContent === "Hello CodeReps" // true

updateHeadline("");
document.querySelector("#title").textContent === "" // true

updateHeadline("123");
document.querySelector("#title").textContent === "123" // true
```

**DOM check:** The live preview shows the h1 text changing in real time.

### Solution

```javascript
function updateHeadline(newText) {
  const heading = document.querySelector("#title");
  heading.textContent = newText;
}
```

### Explanation

"You just did your first DOM manipulation. `document.querySelector('#title')` reaches into the page and grabs the element matching that CSS selector. Then `.textContent` lets you read or change the text inside it. This is the foundation of every interactive website: JS selects an element and changes something about it. You'll do this hundreds of times in your career."

### Pattern Unlocked

> **"Grab an element and change it"** = Select and modify: `document.querySelector(selector)` + `.textContent = value`

---

## Challenge 02: Build a Profile Card

### Problem Statement

Write a function called `createProfileCard` that takes a `name` and a `role`, creates a profile card from scratch, and adds it to the page inside `#container`.

The card should be a `<div>` with class `"profile-card"`, containing an `<h2>` with the name and a `<p>` with the role.

**Example:**

```javascript
createProfileCard("Sara", "Developer");
// Adds to #container:
// <div class="profile-card">
//   <h2>Sara</h2>
//   <p>Developer</p>
// </div>
```

### Starter HTML

```html
<div id="container"></div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to build three HTML elements from scratch using JavaScript (a div, an h2, and a p), put text in them, nest them together, and attach the result to the page.

### Step 2: Break Down

**Guided blocks:**

1. Create a `<div>` element
2. Add the class "profile-card" to the div
3. Create an `<h2>` element and set its text to the name
4. Create a `<p>` element and set its text to the role
5. Put the h2 and p inside the div
6. Put the div inside #container

### Step 3: Map to Code

**Options shown:** `document.createElement()`, `.classList.add()`, `.textContent`, `.appendChild()`, `document.querySelector()`

**Correct picks:** All of them

**System hint:** "`document.createElement('div')` creates a new element in memory, but it's not on the page yet. It's invisible until you attach it somewhere using `.appendChild()`. Think of it as building with LEGO: you snap pieces together, then place the finished structure where it belongs."

### Step 4: Starter Code

```javascript
function createProfileCard(name, role) {
  // Step 1: Create a div element
  // Step 2: Add class "profile-card" to the div
  // Step 3: Create an h2 element and set its text to the name
  // Step 4: Create a p element and set its text to the role
  // Step 5: Append h2 and p inside the div
  // Step 6: Append the div to #container
}
```

### Step 5: Verify

```javascript
createProfileCard("Sara", "Developer");

const card = document.querySelector("#container .profile-card");
card !== null                                    // true - card exists
card.querySelector("h2").textContent === "Sara"  // true
card.querySelector("p").textContent === "Developer" // true

createProfileCard("Ahmed", "Designer");
document.querySelectorAll(".profile-card").length === 2 // true - both cards exist
```

### Solution

```javascript
function createProfileCard(name, role) {
  const card = document.createElement("div");
  card.classList.add("profile-card");

  const nameHeading = document.createElement("h2");
  nameHeading.textContent = name;

  const roleText = document.createElement("p");
  roleText.textContent = role;

  card.appendChild(nameHeading);
  card.appendChild(roleText);

  document.querySelector("#container").appendChild(card);
}
```

### Explanation

"You just built HTML from scratch using only JavaScript. This is the **create and append pattern**: create an element, configure it (text, classes, attributes), then attach it to the page. The key insight is that `createElement` builds an element in memory. It's floating in space, not visible, until you `appendChild` it somewhere. You'll use this pattern every time you need to add new content to a page dynamically."

### Pattern Unlocked

> **"Build a new element and add it to the page"** = Create and append: `createElement()` > configure > `appendChild()`

---

## Challenge 03: Render a List

### Problem Statement

Write a function called `renderList` that takes an array of strings and creates a `<ul>` with a `<li>` for each item, then appends it to `#container`.

**Example:**

```javascript
renderList(["Apple", "Banana", "Cherry"]);
// Adds to #container:
// <ul>
//   <li>Apple</li>
//   <li>Banana</li>
//   <li>Cherry</li>
// </ul>
```

### Starter HTML

```html
<div id="container"></div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I have an array of text items. I need to create a list structure in the DOM where each array item becomes a list item inside an unordered list.

### Step 2: Break Down

**Guided blocks:**

1. Create a `<ul>` element
2. Loop through the items array
3. For each item, create a `<li>` element
4. Set the li's text to the current item
5. Append the li to the ul
6. After the loop, append the ul to #container

### Step 3: Map to Code

**Options shown:** `document.createElement()`, `for loop`, `.forEach()`, `.textContent`, `.appendChild()`, `document.querySelector()`

**Correct picks:** `document.createElement()`, loop (either kind), `.textContent`, `.appendChild()`

**System hint:** "This challenge combines a **Track 1 pattern** (looping through an array) with a **Track 2 pattern** (creating DOM elements). For each item in the data, you create an element. This is the most fundamental frontend pattern: turning data into UI. React, Vue, and Angular all do exactly this under the hood."

### Step 4: Starter Code

```javascript
function renderList(items) {
  // Step 1: Create a ul element
  // Step 2: Loop through the items array
  // Step 3: For each item, create a li element with the item's text
  // Step 4: Append each li to the ul
  // Step 5: Append the ul to #container
}
```

### Step 5: Verify

```javascript
renderList(["Apple", "Banana", "Cherry"]);

const ul = document.querySelector("#container ul");
ul !== null                                     // true
ul.children.length === 3                        // true
ul.children[0].textContent === "Apple"          // true
ul.children[2].textContent === "Cherry"         // true

// Edge case
renderList([]);
document.querySelectorAll("#container ul").length === 2  // true - empty ul still created
```

### Solution

```javascript
function renderList(items) {
  const ul = document.createElement("ul");

  for (let i = 0; i < items.length; i++) {
    const li = document.createElement("li");
    li.textContent = items[i];
    ul.appendChild(li);
  }

  document.querySelector("#container").appendChild(ul);
}
```

### Explanation

"You just turned data into UI. This is the **render from data pattern** and it's arguably the most important concept in frontend development. Every list, every table, every feed, every search result you've ever seen on a website was built this way: take an array of data, loop through it, create an element for each item, and attach them to the page. Frameworks like React do this with JSX (`.map()` inside a template), but the underlying idea is exactly what you just wrote."

### Pattern Unlocked

> **"Turn an array into visible elements"** = Render from data: create a container, loop through data, create + append an element per item.

---

## Challenge 04: Toggle Dark Mode

### Problem Statement

Write two functions:

1. `toggleDarkMode()` -- toggles the class `"dark"` on the `<body>` element
2. `isDarkMode()` -- returns `true` if dark mode is currently active, `false` otherwise

**Example:**

```javascript
isDarkMode();       // false (starts without dark class)
toggleDarkMode();   // adds "dark" class to body
isDarkMode();       // true
toggleDarkMode();   // removes "dark" class
isDarkMode();       // false
```

### Starter HTML

```html
<body>
  <div id="page">
    <h1>Toggle Dark Mode</h1>
    <p>Click the button to switch themes.</p>
    <button id="theme-btn">Toggle Theme</button>
  </div>
</body>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to add or remove a CSS class on the body element. If the class is there, remove it. If it's not there, add it. I also need a way to check whether the class is currently present.

### Step 2: Break Down

**Guided blocks:**

1. For toggleDarkMode: select the body element
2. Toggle the "dark" class on it (add if missing, remove if present)
3. For isDarkMode: select the body element
4. Check if it contains the "dark" class
5. Return true or false

### Step 3: Map to Code

**Options shown:** `document.body`, `document.querySelector("body")`, `.classList.toggle()`, `.classList.add()`, `.classList.remove()`, `.classList.contains()`

**Correct picks:** `document.body`, `.classList.toggle()`, `.classList.contains()`

**System hint:** "JavaScript controls how things look by adding and removing CSS classes, not by writing CSS directly. `.classList.toggle('dark')` is a shortcut that checks: 'Does this class exist? If yes, remove it. If no, add it.' This is exactly how theme switchers, dropdown menus, and mobile nav toggles work in real apps."

### Step 4: Starter Code

```javascript
function toggleDarkMode() {
  // Step 1: Select the body element (hint: document.body is a shortcut)
  // Step 2: Toggle the "dark" class on it
}

function isDarkMode() {
  // Step 1: Select the body element
  // Step 2: Check if it has the "dark" class
  // Step 3: Return true or false
}
```

### Step 5: Verify

```javascript
isDarkMode() === false           // true - starts without dark

toggleDarkMode();
isDarkMode() === true            // true - dark class added
document.body.classList.contains("dark") === true  // true

toggleDarkMode();
isDarkMode() === false           // true - dark class removed

// Multiple toggles
toggleDarkMode();
toggleDarkMode();
toggleDarkMode();
isDarkMode() === true            // true - odd number of toggles
```

### Solution

```javascript
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function isDarkMode() {
  return document.body.classList.contains("dark");
}
```

### Explanation

"This is the **toggle state pattern**. Instead of tracking state in a variable (like `let isDark = false`), you're using the DOM itself as the source of truth. The CSS class IS the state. This is a common approach in vanilla JS: add a class to change appearance, check for the class to know the current state. Real-world uses include theme switching, showing/hiding menus, expanding/collapsing sections, and marking items as selected."

### Pattern Unlocked

> **"Switch something on/off with a class"** = Toggle state: `element.classList.toggle("className")` to switch, `.classList.contains("className")` to check.

---

## Challenge 05: Highlight All Links

### Problem Statement

Write two functions:

1. `highlightLinks()` -- finds all `<a>` tags on the page and adds the class `"highlighted"` to each one
2. `countLinks()` -- returns the total number of `<a>` tags on the page

**Example:**

```javascript
countLinks();       // 3 (if page has 3 links)
highlightLinks();   // all 3 links now have class "highlighted"
```

### Starter HTML

```html
<div id="page">
  <p>Visit <a href="#">Google</a> or <a href="#">GitHub</a> for more info.</p>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </nav>
</div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to select ALL anchor elements on the page (not just one), loop through them, and add a class to each. I also need to count how many there are.

### Step 2: Break Down

**Guided blocks:**

1. Select all `<a>` elements on the page (not just one)
2. Loop through each one
3. Add the "highlighted" class to each
4. For countLinks: select all `<a>` elements and return the count

### Step 3: Map to Code

**Options shown:** `document.querySelector()`, `document.querySelectorAll()`, `.classList.add()`, `for loop`, `.forEach()`, `.length`

**Correct picks:** `document.querySelectorAll()`, `.classList.add()`, loop or `.forEach()`, `.length`

**System hint:** "`querySelector` returns ONE element (the first match). `querySelectorAll` returns ALL matching elements as a NodeList. A NodeList looks like an array -- it has `.length` and you can loop through it with `for` or `.forEach()`. Any time you need to change MULTIPLE elements, you need `querySelectorAll`."

### Step 4: Starter Code

```javascript
function highlightLinks() {
  // Step 1: Select ALL <a> elements (hint: querySelectorAll, not querySelector)
  // Step 2: Loop through each one
  // Step 3: Add class "highlighted" to each
}

function countLinks() {
  // Step 1: Select all <a> elements
  // Step 2: Return how many there are
}
```

### Step 5: Verify

```javascript
countLinks() === 5                        // true

highlightLinks();
const links = document.querySelectorAll("a");
links[0].classList.contains("highlighted") === true  // true
links[4].classList.contains("highlighted") === true  // true

// All links have the class
let allHighlighted = true;
links.forEach(link => {
  if (!link.classList.contains("highlighted")) allHighlighted = false;
});
allHighlighted === true                    // true
```

### Solution

```javascript
function highlightLinks() {
  const links = document.querySelectorAll("a");

  links.forEach(function (link) {
    link.classList.add("highlighted");
  });
}

function countLinks() {
  const links = document.querySelectorAll("a");
  return links.length;
}
```

### Explanation

"You used the **batch update pattern**: select many elements, loop through them, and change each one. The key difference from Challenge 01 is `querySelectorAll` vs `querySelector`. One gives you a single element, the other gives you a collection. This pattern is everywhere: highlight search results, disable all form inputs, hide all tooltips, update all prices during a sale. Whenever you think 'do X to ALL of these', you need `querySelectorAll` + a loop."

### Pattern Unlocked

> **"Change multiple elements at once"** = Batch update: `querySelectorAll(selector)` + `.forEach()` or loop to modify each.

---

## Challenge 06: Clear and Rebuild a Todo List

### Problem Statement

Write a function called `renderTodos` that takes an array of todo objects and renders them as a list. Each todo has `{ text, done }`. If `done` is true, add class `"completed"` to that `<li>`.

The function should **clear the existing list first** before rendering, so calling it again with new data replaces the old list.

**Example:**

```javascript
renderTodos([
  { text: "Buy groceries", done: false },
  { text: "Walk the dog", done: true },
  { text: "Write code", done: false }
]);
// #todo-list contains 3 <li> elements
// "Walk the dog" li has class "completed"

renderTodos([{ text: "Sleep", done: false }]);
// #todo-list now contains ONLY 1 <li> (old items cleared)
```

### Starter HTML

```html
<div id="app">
  <h2>My Todos</h2>
  <ul id="todo-list"></ul>
</div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to wipe everything currently inside the list, then create a new list item for each todo. Completed todos need a special class. Every time the function runs, it starts fresh.

### Step 2: Break Down

**Guided blocks:**

1. Select the #todo-list element
2. Clear all its current content
3. Loop through the todos array
4. For each todo, create a `<li>` element
5. Set its text to `todo.text`
6. If `todo.done` is true, add class "completed"
7. Append the li to #todo-list

### Step 3: Map to Code

**Options shown:** `document.querySelector()`, `.innerHTML = ""`, `for loop`, `document.createElement()`, `.textContent`, `.classList.add()`, `.appendChild()`, `if`

**Correct picks:** All of them

**System hint:** "Setting `element.innerHTML = ''` erases everything inside that element. This is the simplest way to 'start fresh'. Then you rebuild the content from the new data. This **clear and rebuild** pattern is actually how many UI frameworks work conceptually: when data changes, throw away the old UI and build new UI from the current data."

### Step 4: Starter Code

```javascript
function renderTodos(todos) {
  // Step 1: Select #todo-list
  // Step 2: Clear its contents (innerHTML = "")
  // Step 3: Loop through todos
  // Step 4: Create a li for each todo with its text
  // Step 5: If todo.done is true, add class "completed"
  // Step 6: Append each li to the list
}
```

### Step 5: Verify

```javascript
renderTodos([
  { text: "Buy groceries", done: false },
  { text: "Walk the dog", done: true },
  { text: "Write code", done: false }
]);

const items = document.querySelectorAll("#todo-list li");
items.length === 3                                       // true
items[0].textContent === "Buy groceries"                 // true
items[1].classList.contains("completed") === true         // true
items[2].classList.contains("completed") === false        // true

// Re-render with new data
renderTodos([{ text: "Sleep", done: false }]);
document.querySelectorAll("#todo-list li").length === 1  // true

// Empty array
renderTodos([]);
document.querySelectorAll("#todo-list li").length === 0  // true
```

### Solution

```javascript
function renderTodos(todos) {
  const list = document.querySelector("#todo-list");
  list.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const li = document.createElement("li");
    li.textContent = todos[i].text;

    if (todos[i].done) {
      li.classList.add("completed");
    }

    list.appendChild(li);
  }
}
```

### Explanation

"You used the **clear and rebuild pattern**. This is a critical concept: when your data changes, you don't try to figure out which individual elements to update. You just erase everything and re-render from scratch. It sounds wasteful, but it's actually how React's mental model works. React's virtual DOM is an optimization on top of this exact idea. For small lists like this, clearing and rebuilding is perfectly fine and much simpler than tracking individual changes."

### Pattern Unlocked

> **"Replace old content with new content"** = Clear and rebuild: `container.innerHTML = ""` then re-render from current data.

---

## Challenge 07: Build a Product Table

### Problem Statement

Write a function called `renderTable` that takes an array of product objects and builds an HTML table inside `#container`.

Each product has `{ name, price, inStock }`. The table should have a header row with columns "Name", "Price", and "In Stock". Rows where `inStock` is false should get class `"out-of-stock"`.

**Example:**

```javascript
renderTable([
  { name: "Laptop", price: 999, inStock: true },
  { name: "Keyboard", price: 75, inStock: false },
  { name: "Mouse", price: 25, inStock: true }
]);
```

### Starter HTML

```html
<div id="container"></div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to create a table from scratch with a header row and one data row per product. Products that are out of stock get a special class on their row.

### Step 2: Break Down

**Guided blocks:**

1. Create a `<table>` element
2. Create a header row (`<tr>`) with three `<th>` cells: "Name", "Price", "In Stock"
3. Append the header row to the table
4. Loop through the products array
5. For each product, create a `<tr>` with three `<td>` cells
6. Fill each td with the product's name, price, and inStock value
7. If inStock is false, add "out-of-stock" class to the row
8. Append the row to the table
9. Append the table to #container

### Step 3: Map to Code

**Options shown:** `document.createElement()`, `.appendChild()`, `.textContent`, `.classList.add()`, `for loop`, `if`, `"table"`, `"tr"`, `"th"`, `"td"`

**Correct picks:** All of them

**System hint:** "A table is a nested structure: `<table>` contains `<tr>` rows, and each row contains `<th>` (header) or `<td>` (data) cells. You're building three levels of nesting. This is the same create-and-append pattern from Challenge 02, just with more levels. Break it into sub-tasks: first build the header row, then loop to build data rows."

### Step 4: Starter Code

```javascript
function renderTable(products) {
  // Step 1: Create the table element
  // Step 2: Build the header row with th cells: "Name", "Price", "In Stock"
  // Step 3: Append header row to table
  // Step 4: Loop through products
  // Step 5: For each product, create a tr with 3 td cells
  // Step 6: If not in stock, add "out-of-stock" class to the tr
  // Step 7: Append each row to the table
  // Step 8: Append the table to #container
}
```

### Step 5: Verify

```javascript
renderTable([
  { name: "Laptop", price: 999, inStock: true },
  { name: "Keyboard", price: 75, inStock: false },
  { name: "Mouse", price: 25, inStock: true }
]);

const table = document.querySelector("#container table");
table !== null                                            // true

const rows = table.querySelectorAll("tr");
rows.length === 4                                          // true (1 header + 3 data)

const headers = rows[0].querySelectorAll("th");
headers[0].textContent === "Name"                          // true
headers[1].textContent === "Price"                         // true
headers[2].textContent === "In Stock"                      // true

rows[2].classList.contains("out-of-stock") === true        // true (Keyboard row)
rows[1].classList.contains("out-of-stock") === false       // true (Laptop row)

// Empty array
renderTable([]);
document.querySelectorAll("#container table tr").length === 1 // true (header only)
```

### Solution

```javascript
function renderTable(products) {
  const table = document.createElement("table");

  // Build header row
  const headerRow = document.createElement("tr");
  const headers = ["Name", "Price", "In Stock"];

  for (let i = 0; i < headers.length; i++) {
    const th = document.createElement("th");
    th.textContent = headers[i];
    headerRow.appendChild(th);
  }

  table.appendChild(headerRow);

  // Build data rows
  for (let i = 0; i < products.length; i++) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = products[i].name;

    const priceCell = document.createElement("td");
    priceCell.textContent = products[i].price;

    const stockCell = document.createElement("td");
    stockCell.textContent = products[i].inStock ? "Yes" : "No";

    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(stockCell);

    if (!products[i].inStock) {
      row.classList.add("out-of-stock");
    }

    table.appendChild(row);
  }

  document.querySelector("#container").appendChild(table);
}
```

### Explanation

"You just built a data table from scratch. This is the create-and-append pattern scaled up with nesting: a table contains rows, rows contain cells. Notice how you used two separate loops: one for the header (a fixed list of column names) and one for the data rows (dynamic from the array). You also used the ternary operator (`? :`) to convert a boolean into readable text. Data tables are one of the most common UI components in dashboards, admin panels, and e-commerce sites."

### Pattern Unlocked

> **"Build nested structures from data"** = Nested create-and-append: create the outer container, loop to build inner elements, nest them before attaching to the page.

---

## Challenge 08: Swap Two Elements

### Problem Statement

Write a function called `swapElements` that takes two CSS selectors and swaps the positions of those two elements in the DOM. Their parent containers stay the same.

**Example:**

```javascript
// Before: [Item A] [Item B] [Item C]
swapElements("#item-a", "#item-c");
// After: [Item C] [Item B] [Item A]
```

### Starter HTML

```html
<ul id="list">
  <li id="item-a">Item A</li>
  <li id="item-b">Item B</li>
  <li id="item-c">Item C</li>
  <li id="item-d">Item D</li>
</ul>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to find two elements and make them switch places. Whatever was in position 1 goes to position 2, and vice versa. The other elements stay where they are.

### Step 2: Break Down

**Guided blocks:**

1. Select both elements by their selectors
2. Save a reference to the next sibling of the second element (so we know where to insert)
3. Get the parent of the second element
4. Put the first element where the second element was
5. Put the second element where the first element was

### Step 3: Map to Code

**Options shown:** `document.querySelector()`, `.parentElement`, `.nextSibling`, `.insertBefore()`, `.appendChild()`

**Correct picks:** `document.querySelector()`, `.parentElement`, `.nextSibling`, `.insertBefore()`

**System hint:** "Swapping is tricky because moving an element automatically removes it from its old position. You need a 'bookmark' to remember where things were. The trick: save the `nextSibling` of one element before moving anything. Then use `insertBefore` to place elements at specific positions. This teaches you that DOM elements have a physical order relative to their siblings."

### Step 4: Starter Code

```javascript
function swapElements(selector1, selector2) {
  // Step 1: Select both elements
  // Step 2: Save the parent and nextSibling of element2 (as a bookmark)
  // Step 3: Insert element1 before the bookmark (moves it to element2's old position)
  // Step 4: Insert element2 where element1 was
  // Hint: if element1 has no nextSibling, use appendChild on its parent
}
```

### Step 5: Verify

```javascript
// Initial order: A, B, C, D
swapElements("#item-a", "#item-c");
const items = document.querySelectorAll("#list li");
items[0].textContent === "Item C"  // true
items[1].textContent === "Item B"  // true
items[2].textContent === "Item A"  // true
items[3].textContent === "Item D"  // true

// Swap adjacent elements
swapElements("#item-c", "#item-b");
const items2 = document.querySelectorAll("#list li");
items2[0].textContent === "Item B" // true
items2[1].textContent === "Item C" // true
```

### Solution

```javascript
function swapElements(selector1, selector2) {
  const el1 = document.querySelector(selector1);
  const el2 = document.querySelector(selector2);

  const parent1 = el1.parentElement;
  const next1 = el1.nextSibling;

  const parent2 = el2.parentElement;
  const next2 = el2.nextSibling;

  // Move el1 to el2's position
  if (next2) {
    parent2.insertBefore(el1, next2);
  } else {
    parent2.appendChild(el1);
  }

  // Move el2 to el1's old position
  if (next1) {
    parent1.insertBefore(el2, next1);
  } else {
    parent1.appendChild(el2);
  }
}
```

### Explanation

"You used the **parent-child navigation pattern**. DOM elements aren't just floating in space. Each one has a parent (`.parentElement`), and siblings (`.nextSibling`, `.previousSibling`). When you move an element with `insertBefore` or `appendChild`, it's automatically removed from its old position. That's why you need to save the 'bookmark' (nextSibling) BEFORE moving anything. This concept of navigating the DOM tree is essential for building drag-and-drop, reorderable lists, and any UI that rearranges content."

### Pattern Unlocked

> **"Navigate the DOM tree"** = Parent-child navigation: `.parentElement`, `.nextSibling`, `.children`, `.insertBefore()` to read and rearrange element positions.

---

## Challenge 09: Clone a Template Card

### Problem Statement

The page has a `<template id="card-template">` containing a card structure. Write a function called `createCard` that takes a `title` and a `body`, clones the template, fills in the content, and appends it to `#cards-container`.

**Example:**

```javascript
createCard("Welcome", "This is your first card.");
createCard("Tip", "Use templates to avoid repetitive code.");
// Two cards appear in #cards-container
```

### Starter HTML

```html
<template id="card-template">
  <div class="card">
    <h3 class="card-title"></h3>
    <p class="card-body"></p>
  </div>
</template>

<div id="cards-container"></div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** There's a hidden template on the page with a pre-built card structure. I need to make a copy of it, fill in the title and body text, and add the copy to the page. The template itself stays hidden and reusable.

### Step 2: Break Down

**Guided blocks:**

1. Select the template element
2. Clone its content (make a deep copy)
3. Inside the clone, find the `.card-title` element and set its text
4. Inside the clone, find the `.card-body` element and set its text
5. Append the clone to #cards-container

### Step 3: Map to Code

**Options shown:** `document.querySelector()`, `.content`, `.cloneNode(true)`, `.querySelector()` (on the clone), `.textContent`, `.appendChild()`

**Correct picks:** All of them

**System hint:** "`<template>` elements are special: they hold HTML that's NOT rendered on the page. Their content lives in a `.content` property (a DocumentFragment). Use `.cloneNode(true)` to make a deep copy (including all children). You can then use `querySelector` on the clone to find elements inside it, fill them in, and append the finished card. This avoids building HTML strings manually."

### Step 4: Starter Code

```javascript
function createCard(title, body) {
  // Step 1: Select the template element by ID
  // Step 2: Clone its content with cloneNode(true)
  // Step 3: Find .card-title inside the clone and set its text
  // Step 4: Find .card-body inside the clone and set its text
  // Step 5: Append the clone to #cards-container
}
```

### Step 5: Verify

```javascript
createCard("Welcome", "First card content.");
createCard("Tip", "Second card content.");

const cards = document.querySelectorAll("#cards-container .card");
cards.length === 2                                         // true
cards[0].querySelector(".card-title").textContent === "Welcome"  // true
cards[0].querySelector(".card-body").textContent === "First card content." // true
cards[1].querySelector(".card-title").textContent === "Tip"      // true

// Template is still intact and hidden
document.querySelector("#card-template").content.querySelector(".card-title").textContent === "" // true
```

### Solution

```javascript
function createCard(title, body) {
  const template = document.querySelector("#card-template");
  const clone = template.content.cloneNode(true);

  clone.querySelector(".card-title").textContent = title;
  clone.querySelector(".card-body").textContent = body;

  document.querySelector("#cards-container").appendChild(clone);
}
```

### Explanation

"You used the **template stamping pattern**. Instead of manually creating every element with `createElement` (like in Challenge 02), you defined the structure once in HTML and cloned it for each use. This is cleaner, easier to maintain, and closer to how modern frameworks work. The `<template>` tag is a built-in browser feature specifically designed for this. The key concept: `cloneNode(true)` makes a deep copy, so the original template is never modified. You can stamp out as many copies as you need."

### Pattern Unlocked

> **"Clone a reusable structure"** = Template stamping: `template.content.cloneNode(true)` > fill in data > append.

---

## Challenge 10: Read Data Attributes

### Problem Statement

The page has several `<button>` elements with `data-action` attributes. Write two functions:

1. `getButtonsByAction(action)` -- returns an array of buttons matching the given action
2. `getActionOf(button)` -- takes a button element and returns its action string

**Example:**

```javascript
getButtonsByAction("save");   // [<button>, <button>] (all save buttons)
getButtonsByAction("delete"); // [<button>]
getActionOf(someButton);      // "edit"
```

### Starter HTML

```html
<div id="toolbar">
  <button data-action="save" class="btn">Save Draft</button>
  <button data-action="save" class="btn">Save & Publish</button>
  <button data-action="edit" class="btn">Edit</button>
  <button data-action="delete" class="btn">Delete</button>
</div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** Buttons have hidden metadata (data-action) that describes what they do. I need to filter buttons by this metadata and also read the metadata from a specific button.

### Step 2: Break Down

**Guided blocks:**

1. For getButtonsByAction: select all buttons on the page
2. Filter them: keep only buttons whose data-action matches the given action
3. Return matching buttons as an array
4. For getActionOf: read the button's data-action attribute and return it

### Step 3: Map to Code

**Options shown:** `document.querySelectorAll()`, `.dataset.action`, `.getAttribute("data-action")`, `Array.from()`, `.filter()`, `for loop`

**Correct picks:** `document.querySelectorAll()`, `.dataset.action` or `.getAttribute()`, `Array.from()`, `.filter()` or loop

**System hint:** "HTML `data-*` attributes let you store custom metadata on any element. In JS, access them through the `.dataset` property: `element.dataset.action` reads `data-action`. You can also use `querySelectorAll('[data-action=\"save\"]')` to select elements by attribute directly. This is how many JS libraries (like Bootstrap and Alpine.js) connect behavior to HTML without extra JS code."

### Step 4: Starter Code

```javascript
function getButtonsByAction(action) {
  // Step 1: Select all buttons
  // Step 2: Convert NodeList to array (Array.from or spread)
  // Step 3: Filter to keep only buttons where data-action matches
  // Step 4: Return the filtered array
}

function getActionOf(button) {
  // Step 1: Read the button's data-action attribute
  // Step 2: Return it
}
```

### Step 5: Verify

```javascript
getButtonsByAction("save").length === 2          // true
getButtonsByAction("delete").length === 1        // true
getButtonsByAction("nonexistent").length === 0   // true

const editBtn = document.querySelector('[data-action="edit"]');
getActionOf(editBtn) === "edit"                  // true

const saveBtn = document.querySelector('[data-action="save"]');
getActionOf(saveBtn) === "save"                  // true
```

### Solution (Approach A -- filter)

```javascript
function getButtonsByAction(action) {
  const allButtons = document.querySelectorAll("button");
  const buttonsArray = Array.from(allButtons);

  return buttonsArray.filter(function (button) {
    return button.dataset.action === action;
  });
}

function getActionOf(button) {
  return button.dataset.action;
}
```

### Solution (Approach B -- attribute selector)

```javascript
function getButtonsByAction(action) {
  const matching = document.querySelectorAll('[data-action="' + action + '"]');
  return Array.from(matching);
}

function getActionOf(button) {
  return button.dataset.action;
}
```

### Explanation

"You used the **attribute routing pattern**. HTML elements can carry invisible metadata through `data-*` attributes, and JavaScript can read that metadata to make decisions. Approach A finds all buttons then filters in JS. Approach B uses a CSS attribute selector to let the browser do the filtering. Both are valid. This pattern is the foundation of declarative programming in the DOM: the HTML says WHAT something is (`data-action='save'`), and JS decides what to DO with it. You'll see this in frameworks, component libraries, and custom JS everywhere."

### Pattern Unlocked

> **"Read metadata from HTML to drive logic"** = Attribute routing: `element.dataset.name` or `getAttribute("data-name")` to read, `[data-attr="value"]` selectors to find.

---

## Challenge 11: Remove Completed Items

### Problem Statement

The page has a `<ul id="tasks">` with several `<li>` elements. Some have class `"done"`. Write a function called `removeDone` that removes all li elements with class "done" from the list and returns the number of items removed.

**Example:**

```javascript
// Before: [Buy milk (done), Write code, Walk dog (done), Read book]
removeDone(); // Returns 2
// After: [Write code, Read book]
```

### Starter HTML

```html
<ul id="tasks">
  <li class="done">Buy milk</li>
  <li>Write code</li>
  <li class="done">Walk the dog</li>
  <li>Read a book</li>
  <li class="done">Clean house</li>
</ul>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to find all list items that have the "done" class, count them, remove each one from the page, and return the count.

### Step 2: Break Down

**Guided blocks:**

1. Select all li elements inside #tasks that have class "done"
2. Save the count (to return later)
3. Loop through each matching element
4. Remove it from the DOM
5. Return the count

### Step 3: Map to Code

**Options shown:** `document.querySelectorAll()`, `.remove()`, `for loop`, `.forEach()`, `.length`, CSS selector `"#tasks li.done"`

**Correct picks:** `document.querySelectorAll("#tasks li.done")`, `.forEach()`, `.remove()`, `.length`

**System hint:** "The CSS selector `#tasks li.done` is powerful: it means 'find li elements with class done that are inside #tasks'. This lets the browser do the filtering for you. Then `.remove()` on each element takes it out of the DOM entirely. Note: `querySelectorAll` returns a static NodeList (a snapshot), so removing elements during a loop is safe. It won't mess up your iteration."

### Step 4: Starter Code

```javascript
function removeDone() {
  // Step 1: Select all li elements with class "done" inside #tasks
  // Step 2: Save the count
  // Step 3: Loop through and remove each one
  // Step 4: Return the count
}
```

### Step 5: Verify

```javascript
const countRemoved = removeDone();

countRemoved === 3                                       // true
document.querySelectorAll("#tasks li").length === 2      // true
document.querySelectorAll("#tasks li.done").length === 0 // true

// Remaining items are correct
const remaining = document.querySelectorAll("#tasks li");
remaining[0].textContent === "Write code"                // true
remaining[1].textContent === "Read a book"               // true

// Calling again when no done items exist
removeDone() === 0                                       // true
```

### Solution

```javascript
function removeDone() {
  const doneItems = document.querySelectorAll("#tasks li.done");
  const count = doneItems.length;

  doneItems.forEach(function (item) {
    item.remove();
  });

  return count;
}
```

### Explanation

"You combined CSS selectors with DOM removal. The selector `#tasks li.done` does the filtering work that you would have needed a loop + if statement for. Then `.remove()` is the simplest way to take an element off the page entirely. This is different from hiding (which keeps the element in the DOM but invisible). Removing is permanent. Real-world uses: clearing notifications, removing items from a cart, deleting messages."

### Pattern Unlocked

> **"Remove elements from the page"** = Select with a specific CSS selector, then `.remove()` each matched element.

---

## Challenge 12: Sort a List Alphabetically

### Problem Statement

Write a function called `sortList` that takes the ID of a `<ul>`, reads all its `<li>` text contents, sorts them alphabetically, and re-renders the list in sorted order.

**Example:**

```javascript
// Before: [Cherry, Apple, Banana, Date]
sortList("fruits");
// After: [Apple, Banana, Cherry, Date]
```

### Starter HTML

```html
<ul id="fruits">
  <li>Cherry</li>
  <li>Apple</li>
  <li>Banana</li>
  <li>Date</li>
  <li>Elderberry</li>
</ul>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to read what's currently displayed in the list, sort that data alphabetically, clear the list, and put the items back in sorted order.

### Step 2: Break Down

**Guided blocks:**

1. Select the ul element by its ID
2. Get all li children inside it
3. Extract the text content of each li into an array
4. Sort the array alphabetically
5. Clear the ul
6. Loop through the sorted array and create new li elements
7. Append each to the ul

### Step 3: Map to Code

**Options shown:** `document.getElementById()`, `.querySelectorAll()`, `Array.from()`, `.map()`, `.sort()`, `.textContent`, `.innerHTML = ""`, `document.createElement()`, `.appendChild()`

**Correct picks:** All of them

**System hint:** "This challenge goes in reverse compared to 'render from data'. Usually you start with data and build DOM. Here you start with DOM and extract data. The flow is: **DOM to data** (read text), **process data** (sort), **data to DOM** (re-render). This read-process-write cycle is a very common pattern when you need to transform existing page content."

### Step 4: Starter Code

```javascript
function sortList(listId) {
  // Step 1: Select the ul by ID
  // Step 2: Get all li elements inside it
  // Step 3: Extract their text into an array
  //         (hint: Array.from(items).map(item => item.textContent))
  // Step 4: Sort the array alphabetically
  // Step 5: Clear the ul
  // Step 6: Loop through sorted array, create li for each, append
}
```

### Step 5: Verify

```javascript
sortList("fruits");

const items = document.querySelectorAll("#fruits li");
items[0].textContent === "Apple"       // true
items[1].textContent === "Banana"      // true
items[2].textContent === "Cherry"      // true
items[3].textContent === "Date"        // true
items[4].textContent === "Elderberry"  // true

// Already sorted list stays the same
sortList("fruits");
document.querySelectorAll("#fruits li")[0].textContent === "Apple" // true
```

### Solution

```javascript
function sortList(listId) {
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
}
```

### Explanation

"You just did the full **read-process-write cycle**: extract data from the DOM, transform it (sort), then write it back. This is how search results get reordered, how table columns become sortable, and how filter-and-sort UIs work. Notice you used `.map()` (from Track 1) to transform a list of elements into a list of strings. Patterns compound: Track 1 skills power Track 2 solutions."

### Pattern Unlocked

> **"Read from the DOM, process, and write back"** = Read-process-write: extract data from elements, transform it, clear container, re-render.

---

## Challenge 13: Build a Breadcrumb Trail

### Problem Statement

Write a function called `renderBreadcrumbs` that takes an array of path names and renders a breadcrumb navigation inside `#breadcrumb`. Each path becomes a `<span>`. A text separator `" > "` goes between items (but NOT after the last one). The last item gets class `"active"`.

**Example:**

```javascript
renderBreadcrumbs(["Home", "Products", "Shoes"]);
// Renders: Home > Products > Shoes
// "Shoes" span has class "active"
```

### Starter HTML

```html
<nav id="breadcrumb"></nav>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to build a row of text items with separators between them. The last item is special (it gets a class). The separator should only appear BETWEEN items, not at the end.

### Step 2: Break Down

**Guided blocks:**

1. Select #breadcrumb and clear it
2. Loop through the paths array
3. Create a `<span>` for each path with its text
4. If it's the last item, add class "active"
5. Append the span to #breadcrumb
6. If it's NOT the last item, also create and append a separator text node

### Step 3: Map to Code

**Options shown:** `document.querySelector()`, `document.createElement()`, `document.createTextNode()`, `.classList.add()`, `.appendChild()`, `.textContent`, `.innerHTML = ""`, `for loop`, `array.length - 1`

**Correct picks:** All of them

**System hint:** "The tricky part is the separator. You need to add it BETWEEN items, not after each one. The simplest approach: check `if (i < paths.length - 1)` to know if the current item is NOT the last one. If it's not last, add a separator after it. `document.createTextNode(' > ')` creates a plain text node (not an element). This 'separator between items' pattern appears in breadcrumbs, comma-separated lists, tag displays, and step indicators."

### Step 4: Starter Code

```javascript
function renderBreadcrumbs(paths) {
  // Step 1: Select #breadcrumb and clear it
  // Step 2: Loop through paths
  // Step 3: Create a span for each path with its text
  // Step 4: If it's the last item, add class "active"
  // Step 5: Append the span
  // Step 6: If NOT the last item, append a " > " text node as separator
}
```

### Step 5: Verify

```javascript
renderBreadcrumbs(["Home", "Products", "Shoes"]);

const spans = document.querySelectorAll("#breadcrumb span");
spans.length === 3                                    // true
spans[0].textContent === "Home"                       // true
spans[2].textContent === "Shoes"                      // true
spans[2].classList.contains("active") === true         // true
spans[0].classList.contains("active") === false        // true

// Check separator exists between items
document.querySelector("#breadcrumb").textContent.includes(">") === true // true

// Single item: no separator
renderBreadcrumbs(["Home"]);
document.querySelectorAll("#breadcrumb span").length === 1          // true
document.querySelector("#breadcrumb span").classList.contains("active") === true // true

// Re-render clears old content
renderBreadcrumbs(["A", "B"]);
document.querySelectorAll("#breadcrumb span").length === 2          // true
```

### Solution

```javascript
function renderBreadcrumbs(paths) {
  const nav = document.querySelector("#breadcrumb");
  nav.innerHTML = "";

  for (let i = 0; i < paths.length; i++) {
    const span = document.createElement("span");
    span.textContent = paths[i];

    if (i === paths.length - 1) {
      span.classList.add("active");
    }

    nav.appendChild(span);

    if (i < paths.length - 1) {
      const separator = document.createTextNode(" > ");
      nav.appendChild(separator);
    }
  }
}
```

### Explanation

"You handled the **between items** problem: adding separators or dividers that appear between elements but not after the last one. The check `i < array.length - 1` is the universal way to say 'everything except the last one'. You also used `createTextNode` for the first time. Unlike `createElement`, a text node is just plain text with no HTML tag wrapping it. This pattern shows up any time you build lists with separators: 'tag1, tag2, tag3', breadcrumbs, step indicators like '1 - 2 - 3'."

### Pattern Unlocked

> **"Add separators between items but not after the last"** = Check `if (i < array.length - 1)` inside the loop. Use `createTextNode()` for plain text separators.

---

## Challenge 14: Build a Star Rating Display

### Problem Statement

Write a function called `renderStars` that takes a `rating` (number of filled stars) and `maxStars` (total stars), then renders a star rating inside `#rating-container`. Use `<span>` elements with class `"star-filled"` or `"star-empty"`. Use a DocumentFragment to build all stars before inserting them at once.

**Example:**

```javascript
renderStars(3, 5);
// Renders: [filled] [filled] [filled] [empty] [empty]
// 3 spans with "star-filled", 2 spans with "star-empty"
```

### Starter HTML

```html
<div id="rating-container"></div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to create a row of star indicators. The first N stars are filled (where N is the rating), and the rest are empty. I should build them all off-screen first, then add them to the page in one shot.

### Step 2: Break Down

**Guided blocks:**

1. Select #rating-container and clear it
2. Create a DocumentFragment (an invisible, off-screen container)
3. Loop from 1 to maxStars
4. For each iteration, create a span
5. If the current number is less than or equal to rating, add class "star-filled"
6. Otherwise, add class "star-empty"
7. Append the span to the fragment (not the page yet)
8. After the loop, append the entire fragment to #rating-container (one insert)

### Step 3: Map to Code

**Options shown:** `document.createDocumentFragment()`, `document.createElement()`, `.classList.add()`, `.appendChild()`, `for loop`, `if/else`, `document.querySelector()`

**Correct picks:** All of them

**System hint:** "A `DocumentFragment` is like an invisible container. You can append elements to it without triggering any page redraws. When you're done building, you append the fragment itself, and all its children get inserted at once. This is a performance optimization: 10 individual appends cause 10 redraws, but building in a fragment and appending once causes only 1. For small lists it doesn't matter much, but it's a habit worth building early."

### Step 4: Starter Code

```javascript
function renderStars(rating, maxStars) {
  // Step 1: Select #rating-container and clear it
  // Step 2: Create a DocumentFragment
  // Step 3: Loop from 1 to maxStars
  // Step 4: Create a span for each star
  // Step 5: Add "star-filled" or "star-empty" class based on position
  // Step 6: Append span to the fragment
  // Step 7: After the loop, append the fragment to the container
}
```

### Step 5: Verify

```javascript
renderStars(3, 5);

const stars = document.querySelectorAll("#rating-container span");
stars.length === 5                                          // true

const filled = document.querySelectorAll("#rating-container .star-filled");
const empty = document.querySelectorAll("#rating-container .star-empty");
filled.length === 3                                         // true
empty.length === 2                                          // true

// All empty
renderStars(0, 5);
document.querySelectorAll("#rating-container .star-filled").length === 0 // true
document.querySelectorAll("#rating-container .star-empty").length === 5  // true

// All filled
renderStars(5, 5);
document.querySelectorAll("#rating-container .star-filled").length === 5 // true
document.querySelectorAll("#rating-container .star-empty").length === 0  // true

// Re-render clears old stars
renderStars(1, 3);
document.querySelectorAll("#rating-container span").length === 3        // true
```

### Solution

```javascript
function renderStars(rating, maxStars) {
  const container = document.querySelector("#rating-container");
  container.innerHTML = "";

  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= maxStars; i++) {
    const star = document.createElement("span");

    if (i <= rating) {
      star.classList.add("star-filled");
      star.textContent = "\u2605"; // filled star character
    } else {
      star.classList.add("star-empty");
      star.textContent = "\u2606"; // empty star character
    }

    fragment.appendChild(star);
  }

  container.appendChild(fragment);
}
```

### Explanation

"You used the **fragment batching pattern**. Instead of appending each star directly to the page (which triggers a redraw each time), you built everything inside a DocumentFragment first. When you append the fragment, all its children move to the page in one operation. The fragment itself disappears. It's like building a ship in a bottle: assemble inside, then place. This is a stepping stone to understanding why React's virtual DOM exists. It batches changes for the same reason: fewer DOM updates = better performance."

### Pattern Unlocked

> **"Build multiple elements off-screen, then insert all at once"** = Fragment batching: `document.createDocumentFragment()` > build inside > `container.appendChild(fragment)`.

---

## Challenge 15: Dynamic Filter UI

### Problem Statement

This is the **capstone challenge** for Track 2. You'll build a complete filter UI using every pattern from this track.

You're given an array of product objects with `{ name, category, price }`. Implement three functions:

1. `renderProducts(products)` -- renders product cards inside `#product-grid`
2. `renderFilters(categories)` -- renders filter buttons inside `#filters`, each with a `data-category` attribute
3. `filterByCategory(category)` -- clears the grid, re-renders only matching products (or all if category is "all"), and toggles the "active" class on the matching filter button

**Data:**

```javascript
const products = [
  { name: "Running Shoes", category: "footwear", price: 120 },
  { name: "Sandals", category: "footwear", price: 45 },
  { name: "T-Shirt", category: "clothing", price: 30 },
  { name: "Jeans", category: "clothing", price: 65 },
  { name: "Watch", category: "accessories", price: 200 },
  { name: "Sunglasses", category: "accessories", price: 85 },
  { name: "Hoodie", category: "clothing", price: 55 },
  { name: "Boots", category: "footwear", price: 150 }
];
```

**Example:**

```javascript
renderFilters(["all", "footwear", "clothing", "accessories"]);
renderProducts(products);
// Shows all 8 products, "all" filter button is active

filterByCategory("footwear");
// Shows only 3 footwear products, "footwear" button is active
```

### Starter HTML

```html
<div id="app">
  <div id="filters"></div>
  <div id="product-grid"></div>
</div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to build a product grid and filter buttons. When a filter button is clicked (simulated by calling filterByCategory), the grid clears and shows only matching products. The active button should be highlighted with a class.

### Step 2: Break Down

**Guided blocks:**

1. renderProducts: clear #product-grid, loop through products, create a card div for each with name, category, and price, append to grid
2. renderFilters: loop through categories, create a button for each with text and data-category attribute, append to #filters
3. filterByCategory: if category is "all", use the full products array; otherwise filter products by category. Call renderProducts with the filtered list. Remove "active" class from all filter buttons, then add "active" to the matching button.

### Step 3: Map to Code

**Options shown:** `document.createElement()`, `.appendChild()`, `.innerHTML = ""`, `.textContent`, `.classList.add()`, `.classList.remove()`, `document.querySelectorAll()`, `.dataset.category`, `setAttribute("data-category")`, `for loop`, `.filter()`, `if`

**Correct picks:** All of them (this challenge uses everything)

**System hint:** "This challenge combines nearly every pattern from Track 2:
- **Clear and rebuild** (renderProducts clears and re-renders)
- **Render from data** (products array becomes card elements)
- **Create and append** (building cards and buttons)
- **Attribute routing** (data-category on buttons)
- **Toggle state** (active class on filter buttons)
- **Batch update** (removing active from all buttons)
Think of it as an assembly line: each function handles one job, and they work together to create the full UI."

### Step 4: Starter Code

```javascript
const products = [
  { name: "Running Shoes", category: "footwear", price: 120 },
  { name: "Sandals", category: "footwear", price: 45 },
  { name: "T-Shirt", category: "clothing", price: 30 },
  { name: "Jeans", category: "clothing", price: 65 },
  { name: "Watch", category: "accessories", price: 200 },
  { name: "Sunglasses", category: "accessories", price: 85 },
  { name: "Hoodie", category: "clothing", price: 55 },
  { name: "Boots", category: "footwear", price: 150 }
];

function renderProducts(productList) {
  // Step 1: Select #product-grid and clear it
  // Step 2: Loop through productList
  // Step 3: For each product, create a div with class "product-card"
  // Step 4: Add an h3 with the product name
  // Step 5: Add a p with the price
  // Step 6: Add a span with the category
  // Step 7: Append the card to #product-grid
}

function renderFilters(categories) {
  // Step 1: Select #filters and clear it
  // Step 2: Loop through categories
  // Step 3: Create a button for each with its text
  // Step 4: Set data-category attribute on each button
  // Step 5: Append to #filters
}

function filterByCategory(category) {
  // Step 1: If category is "all", use the full products array
  //         Otherwise, filter products where product.category matches
  // Step 2: Call renderProducts with the filtered list
  // Step 3: Remove "active" class from ALL filter buttons
  // Step 4: Find the button with matching data-category and add "active" class
}
```

### Step 5: Verify

```javascript
renderFilters(["all", "footwear", "clothing", "accessories"]);
renderProducts(products);

// All products rendered
document.querySelectorAll("#product-grid .product-card").length === 8 // true

// Filter buttons exist
document.querySelectorAll("#filters button").length === 4             // true

// Filter by footwear
filterByCategory("footwear");
document.querySelectorAll("#product-grid .product-card").length === 3 // true
document.querySelector('[data-category="footwear"]').classList.contains("active") === true // true
document.querySelector('[data-category="all"]').classList.contains("active") === false     // true

// Filter by clothing
filterByCategory("clothing");
document.querySelectorAll("#product-grid .product-card").length === 3 // true
document.querySelector('[data-category="clothing"]').classList.contains("active") === true // true
document.querySelector('[data-category="footwear"]').classList.contains("active") === false // true

// Show all
filterByCategory("all");
document.querySelectorAll("#product-grid .product-card").length === 8 // true
document.querySelector('[data-category="all"]').classList.contains("active") === true // true

// Verify product card content
const firstCard = document.querySelector("#product-grid .product-card");
firstCard.querySelector("h3") !== null   // true (has a name heading)
firstCard.querySelector("p") !== null    // true (has a price paragraph)
```

### Solution

```javascript
const products = [
  { name: "Running Shoes", category: "footwear", price: 120 },
  { name: "Sandals", category: "footwear", price: 45 },
  { name: "T-Shirt", category: "clothing", price: 30 },
  { name: "Jeans", category: "clothing", price: 65 },
  { name: "Watch", category: "accessories", price: 200 },
  { name: "Sunglasses", category: "accessories", price: 85 },
  { name: "Hoodie", category: "clothing", price: 55 },
  { name: "Boots", category: "footwear", price: 150 }
];

function renderProducts(productList) {
  const grid = document.querySelector("#product-grid");
  grid.innerHTML = "";

  for (let i = 0; i < productList.length; i++) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const name = document.createElement("h3");
    name.textContent = productList[i].name;

    const price = document.createElement("p");
    price.textContent = "$" + productList[i].price;

    const category = document.createElement("span");
    category.textContent = productList[i].category;
    category.classList.add("category-tag");

    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(category);

    grid.appendChild(card);
  }
}

function renderFilters(categories) {
  const filtersContainer = document.querySelector("#filters");
  filtersContainer.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    const button = document.createElement("button");
    button.textContent = categories[i];
    button.setAttribute("data-category", categories[i]);

    filtersContainer.appendChild(button);
  }
}

function filterByCategory(category) {
  let filtered;

  if (category === "all") {
    filtered = products;
  } else {
    filtered = products.filter(function (product) {
      return product.category === category;
    });
  }

  renderProducts(filtered);

  const allButtons = document.querySelectorAll("#filters button");
  allButtons.forEach(function (button) {
    button.classList.remove("active");
  });

  const activeButton = document.querySelector(
    '#filters [data-category="' + category + '"]'
  );
  activeButton.classList.add("active");
}
```

### Explanation

"Congratulations, you just built a real, functional UI feature. This capstone ties together nearly everything from Track 2:

- **Clear and rebuild**: `renderProducts` clears the grid before re-rendering
- **Render from data**: Products array becomes visible cards
- **Create and append**: Every card is built from scratch in JS
- **Attribute routing**: `data-category` on buttons drives the filter logic
- **Batch update**: Removing 'active' from all buttons before adding it to one
- **Toggle state**: The active class shows which filter is selected

This is exactly how product listing pages work on e-commerce sites. The data comes from an API, filters narrow it down, and the UI rebuilds to show the results. The only thing missing is actual click event handlers, which is what Track 3 (Events & Interactions) will teach you."

### Pattern Unlocked

> **"Build a complete interactive UI from data"** = Combine render-from-data + clear-and-rebuild + attribute routing + batch update. Separate your code into small functions that each handle one job: render data, render controls, and connect them with a filter function.

---

## Appendix: All Patterns Unlocked in Track 2

| # | Pattern Name | Plain English | Key Methods |
|---|---|---|---|
| 1 | Select and modify | Grab and change an element | `querySelector`, `textContent` |
| 2 | Create and append | Build new elements from scratch | `createElement`, `appendChild` |
| 3 | Render from data | Turn arrays into visible UI | Loop + createElement per item |
| 4 | Toggle state | Switch appearance with classes | `classList.toggle`, `classList.contains` |
| 5 | Batch update | Change many elements at once | `querySelectorAll` + loop |
| 6 | Clear and rebuild | Wipe and re-render from fresh data | `innerHTML = ""` + re-render |
| 7 | Nested create-and-append | Build multi-level structures | Outer container + inner elements |
| 8 | Parent-child navigation | Walk and rearrange the DOM tree | `parentElement`, `nextSibling`, `insertBefore` |
| 9 | Template stamping | Clone reusable structures | `template.content.cloneNode(true)` |
| 10 | Attribute routing | Read metadata from HTML attributes | `dataset`, `getAttribute`, `[data-*]` selectors |
| 11 | DOM removal | Remove elements that match a condition | `querySelectorAll` + `.remove()` |
| 12 | Read-process-write | Extract data from DOM, transform, put back | Read text > process > clear > re-render |
| 13 | Between-items separator | Add dividers between (not after) items | `if (i < length - 1)` + `createTextNode` |
| 14 | Fragment batching | Build off-screen, insert once | `DocumentFragment` |
| 15 | Combined UI pattern | Full data-driven filter UI | Render + rebuild + routing + batch update |

---

## Cumulative Pattern Count

After completing Track 1 and Track 2:

- **Track 1 patterns**: 19
- **Track 2 patterns**: 15
- **Total patterns in library**: 34

---

## Design Notes for Development Team

### Challenge Metadata (per challenge)

```json
{
  "id": "dom-02",
  "track": "dom-manipulation",
  "order": 2,
  "title": "Build a Profile Card",
  "difficulty": "easy",
  "estimatedMinutes": 10,
  "concepts": ["createElement", "classList", "textContent", "appendChild"],
  "patternsUnlocked": ["create-and-append"],
  "prerequisiteChallenges": ["dom-01"],
  "hints": 3,
  "approaches": 1,
  "starterHTML": true,
  "starterCSS": true,
  "requiresPreview": true
}
```

### Progression Rules

- Challenges 1-5: Guided mode by default, semi-guided available
- Challenges 6-10: Semi-guided by default, all modes available
- Challenges 11-14: Independent by default, all modes available
- Challenge 15 (capstone): Independent encouraged, bonus badge if completed without hints

### Badge

Completing all 15 challenges awards the **"DOM Builder"** badge.
