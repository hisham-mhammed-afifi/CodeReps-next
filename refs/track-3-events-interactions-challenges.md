# Track 3: Events & Interactions -- Challenge Design Document

## Platform Philosophy

Every challenge follows the **5-Step Problem-Solving Framework**:

1. **Understand** -- Rewrite the problem in plain English
2. **Break Down** -- Split it into smaller steps
3. **Map to Code** -- Match each step to a JS/DOM/Event concept
4. **Write** -- Code the solution
5. **Verify** -- Test against expected output by simulating user interactions

Each challenge has 3 difficulty modes:

- **Guided**: All 5 steps are shown and interactive
- **Semi-Guided**: Steps 1-3 are available as optional hints
- **Independent**: Just the problem and the editor

**What's new in Track 3:**
- Every challenge responds to **user actions** (clicks, typing, hovering, key presses)
- The workspace includes an **Interaction Log** that shows events firing in real time
- Tests **simulate user behavior** (programmatic clicks, key presses, input changes)

---

## Challenge 01: Click Counter

### Problem Statement

The page has a button and a `<span id="count">` showing "0". Write code that listens for clicks on the button and increments the count by 1 each time, updating the span.

**Example:**

```
Page loads: count shows "0"
Click button: count shows "1"
Click button: count shows "2"
Click button: count shows "3"
```

### Starter HTML

```html
<div id="app">
  <h2>Click Counter</h2>
  <p>Count: <span id="count">0</span></p>
  <button id="increment-btn">Click Me</button>
</div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to make the button react when the user clicks it. Each click should increase a number by 1 and show the new number on the page.

### Step 2: Break Down

**Guided blocks:**

1. Select the button and the count span
2. Create a variable to track the current count (start at 0)
3. Add a "click" event listener to the button
4. Inside the listener, increment the count variable
5. Update the span's text with the new count

### Step 3: Map to Code

**Options shown:** `document.querySelector()`, `.addEventListener("click", ...)`, `.textContent`, `let` variable, `++` increment

**Correct picks:** All of them

**System hint:** "`.addEventListener('click', function)` tells the browser: 'When this element is clicked, run this function.' The function you pass in is called a **callback** or **handler**. It runs later, when the event happens, not immediately. This is your first taste of **event-driven programming**: instead of code running top to bottom, code runs in response to things happening."

### Step 4: Starter Code

```javascript
// Step 1: Select the button and the count span
// Step 2: Create a count variable starting at 0
// Step 3: Add a "click" event listener to the button
// Step 4: Inside the handler, increment count and update the span
```

### Step 5: Verify

```javascript
const span = document.querySelector("#count");
span.textContent === "0"  // true - starts at 0

document.querySelector("#increment-btn").click();
span.textContent === "1"  // true

document.querySelector("#increment-btn").click();
document.querySelector("#increment-btn").click();
span.textContent === "3"  // true
```

### Solution

```javascript
const button = document.querySelector("#increment-btn");
const countSpan = document.querySelector("#count");
let count = 0;

button.addEventListener("click", function () {
  count++;
  countSpan.textContent = count;
});
```

### Explanation

"You just made the page interactive. `addEventListener` is the bridge between user actions and your code. The browser constantly watches for events (clicks, key presses, scrolling, etc.). When one happens on an element you're listening to, it runs your handler function. Notice the code inside the handler doesn't run when the page loads. It runs ONLY when the button is clicked. This is **event-driven programming**, and it's how every interactive website works."

### Pattern Unlocked

> **"Do something when the user clicks"** = Click handler: `element.addEventListener("click", function() { ... })`

---

## Challenge 02: Who Got Clicked?

### Problem Statement

The page has three colored boxes. Write a **single** click handler function that works for all three boxes. When any box is clicked, display the clicked box's `id` and `data-color` attribute inside `#output`.

**Example:**

```
Click the red box: output shows "Box: box-1, Color: red"
Click the blue box: output shows "Box: box-2, Color: blue"
```

### Starter HTML

```html
<div id="boxes">
  <div id="box-1" class="box" data-color="red">Red</div>
  <div id="box-2" class="box" data-color="blue">Blue</div>
  <div id="box-3" class="box" data-color="green">Green</div>
</div>
<p id="output">Click a box to see its info.</p>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need ONE function that handles clicks on all three boxes. When any box is clicked, the function figures out WHICH box was clicked and shows its id and color attribute.

### Step 2: Break Down

**Guided blocks:**

1. Select all three box elements
2. Write one handler function
3. Inside the handler, use `event.target` to get the clicked element
4. Read the clicked element's id and data-color
5. Display both in #output
6. Attach the same handler to all three boxes

### Step 3: Map to Code

**Options shown:** `document.querySelectorAll()`, `.addEventListener("click", ...)`, `event.target`, `.id`, `.dataset.color`, `.textContent`, `.forEach()`

**Correct picks:** All of them

**System hint:** "When an event fires, the browser creates an **event object** and passes it to your handler function. This object contains information about what happened. `event.target` tells you WHICH element was actually clicked. By reading `event.target.id` and `event.target.dataset.color`, one handler can respond differently depending on which box was clicked. This is much cleaner than writing three separate handlers."

### Step 4: Starter Code

```javascript
// Step 1: Select all elements with class "box"
// Step 2: Write a handler that reads event.target's id and data-color
// Step 3: Display the info in #output
// Step 4: Attach the handler to each box using forEach
```

### Step 5: Verify

```javascript
const output = document.querySelector("#output");

document.querySelector("#box-1").click();
output.textContent === "Box: box-1, Color: red"   // true

document.querySelector("#box-2").click();
output.textContent === "Box: box-2, Color: blue"  // true

document.querySelector("#box-3").click();
output.textContent === "Box: box-3, Color: green" // true
```

### Solution

```javascript
const boxes = document.querySelectorAll(".box");
const output = document.querySelector("#output");

function handleBoxClick(event) {
  const clickedBox = event.target;
  const boxId = clickedBox.id;
  const boxColor = clickedBox.dataset.color;
  output.textContent = "Box: " + boxId + ", Color: " + boxColor;
}

boxes.forEach(function (box) {
  box.addEventListener("click", handleBoxClick);
});
```

### Explanation

"The **event object** is your detective. When something happens, it tells you exactly what happened and where. `event.target` points to the specific element that received the interaction, even if you attached the listener elsewhere. You also saw that one named function (`handleBoxClick`) can be shared across multiple elements. This keeps your code DRY (Don't Repeat Yourself). In Track 2 you used `dataset` to read data attributes. Here you combined it with events: the HTML carries the data, and the event tells you which element to read from."

### Pattern Unlocked

> **"Get info about what triggered the event"** = Event object reading: `event.target` for the element, `.id`, `.dataset`, `.classList` to inspect it.

---

## Challenge 03: Live Character Counter

### Problem Statement

The page has a `<textarea>` and a `<span id="char-count">`. Write code that updates the character count in real time as the user types. When the count exceeds 100 characters, add class `"over-limit"` to the span. When it goes back under 100, remove the class.

**Example:**

```
User types "hello": span shows "5"
User types 101 characters: span shows "101" with class "over-limit"
User deletes down to 99: span shows "99", class removed
```

### Starter HTML

```html
<div id="app">
  <h2>Character Counter</h2>
  <textarea id="message" placeholder="Type your message..."></textarea>
  <p><span id="char-count">0</span> / 100 characters</p>
</div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to watch the textarea for any change (typing, pasting, deleting) and update the count display instantly. If the count goes over 100, I change the style to warn the user.

### Step 2: Break Down

**Guided blocks:**

1. Select the textarea and the count span
2. Add an "input" event listener to the textarea
3. Inside the handler, read the textarea's current value length
4. Update the span text with the count
5. If count > 100, add class "over-limit" to the span
6. Otherwise, remove class "over-limit"

### Step 3: Map to Code

**Options shown:** `addEventListener("input", ...)`, `.value`, `.length`, `.textContent`, `.classList.add()`, `.classList.remove()`, `if/else`

**Correct picks:** All of them

**System hint:** "The `'input'` event fires every time the content of an input or textarea changes. That includes typing, pasting, deleting, and even autocomplete. It's different from `'change'`, which only fires when the user leaves the field. For live, real-time updates, always use `'input'`. The `.value` property gives you the current text inside the field."

### Step 4: Starter Code

```javascript
// Step 1: Select the textarea and the char-count span
// Step 2: Add an "input" event listener to the textarea
// Step 3: Read textarea.value.length inside the handler
// Step 4: Update the span text with the count
// Step 5: Add or remove "over-limit" class based on the count
```

### Step 5: Verify

```javascript
const textarea = document.querySelector("#message");
const span = document.querySelector("#char-count");

// Simulate typing
textarea.value = "hello";
textarea.dispatchEvent(new Event("input"));
span.textContent === "5"                              // true
span.classList.contains("over-limit") === false       // true

// Simulate exceeding limit
textarea.value = "a".repeat(101);
textarea.dispatchEvent(new Event("input"));
span.textContent === "101"                            // true
span.classList.contains("over-limit") === true        // true

// Simulate going back under
textarea.value = "short";
textarea.dispatchEvent(new Event("input"));
span.textContent === "5"                              // true
span.classList.contains("over-limit") === false       // true

// Empty textarea
textarea.value = "";
textarea.dispatchEvent(new Event("input"));
span.textContent === "0"                              // true
```

### Solution

```javascript
const textarea = document.querySelector("#message");
const charCount = document.querySelector("#char-count");

textarea.addEventListener("input", function () {
  const count = textarea.value.length;
  charCount.textContent = count;

  if (count > 100) {
    charCount.classList.add("over-limit");
  } else {
    charCount.classList.remove("over-limit");
  }
});
```

### Explanation

"You used the **input sync pattern**: keep a display element in sync with a form input in real time. Every keystroke triggers the `'input'` event, your handler reads the current value, and updates the UI immediately. This is the basis of every character counter, live preview, search-as-you-type, and real-time validation feature you've ever used. You also combined event handling (Track 3) with class toggling (Track 2) and conditional logic (Track 1). Your patterns are compounding."

### Pattern Unlocked

> **"Keep a display in sync with an input"** = Input sync: `addEventListener("input", handler)` + read `.value` + update the display.

---

## Challenge 04: Todo with Enter Key

### Problem Statement

The page has a text input and a `<ul id="todo-list">`. When the user types a todo and presses the **Enter** key, add a new `<li>` with that text to the list and clear the input. Don't add empty or whitespace-only todos.

**Example:**

```
Type "Buy milk" + press Enter: "Buy milk" appears as a new li
Input is cleared
Type "   " + press Enter: nothing happens (whitespace only)
```

### Starter HTML

```html
<div id="app">
  <h2>Quick Todo</h2>
  <input type="text" id="todo-input" placeholder="Add a todo and press Enter..." />
  <ul id="todo-list"></ul>
</div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to listen for key presses on the input. When the key is specifically Enter, I read the input text, make sure it's not empty, create a list item, add it to the list, and clear the input.

### Step 2: Break Down

**Guided blocks:**

1. Select the input and the todo list
2. Add a "keydown" event listener to the input
3. Inside the handler, check if the pressed key is "Enter"
4. If yes, read the input's value and trim whitespace
5. If the trimmed value is not empty, create a li and append it
6. Clear the input

### Step 3: Map to Code

**Options shown:** `addEventListener("keydown", ...)`, `event.key`, `event.key === "Enter"`, `.value`, `.trim()`, `document.createElement()`, `.appendChild()`, `.textContent`, `if`

**Correct picks:** All of them

**System hint:** "The `'keydown'` event fires when any key is pressed. The event object has a `.key` property telling you WHICH key. `event.key === 'Enter'` is how you detect the Enter key specifically. This is how search bars submit on Enter, chat apps send messages, and command palettes trigger actions. Always `.trim()` user input to catch whitespace-only entries."

### Step 4: Starter Code

```javascript
// Step 1: Select the input and the todo list
// Step 2: Add a "keydown" listener to the input
// Step 3: Inside the handler, check if event.key is "Enter"
// Step 4: Read and trim the input value
// Step 5: If not empty, create a li, set its text, append to list
// Step 6: Clear the input
```

### Step 5: Verify

```javascript
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");

// Simulate typing and pressing Enter
input.value = "Buy milk";
input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
list.children.length === 1                          // true
list.children[0].textContent === "Buy milk"         // true
input.value === ""                                  // true (cleared)

// Add another
input.value = "Walk the dog";
input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
list.children.length === 2                          // true

// Empty input + Enter does nothing
input.value = "";
input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
list.children.length === 2                          // true (unchanged)

// Whitespace only does nothing
input.value = "   ";
input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
list.children.length === 2                          // true (unchanged)

// Other keys don't trigger
input.value = "test";
input.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
list.children.length === 2                          // true (unchanged)
```

### Solution

```javascript
const input = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const text = input.value.trim();

    if (text !== "") {
      const li = document.createElement("li");
      li.textContent = text;
      todoList.appendChild(li);
      input.value = "";
    }
  }
});
```

### Explanation

"You used the **Enter key detection pattern**. Instead of adding a submit button, you let the user press Enter to take action. This is a more natural interaction for many inputs. The pattern is simple: listen for `keydown`, check `event.key === 'Enter'`, then act. The `.trim()` check is a defensive coding habit. Users will always find ways to submit garbage (spaces, empty strings), so always validate. You combined key detection (new) with element creation and appending (Track 2)."

### Pattern Unlocked

> **"Trigger an action when Enter is pressed"** = Enter key detection: `addEventListener("keydown", handler)` + `if (event.key === "Enter") { ... }`

---

## Challenge 05: Event Delegation -- Clickable List

### Problem Statement

The page has a `<ul id="menu">` with 5 `<li>` items. When any item is clicked, add class `"selected"` to it and remove `"selected"` from all others. Use **only ONE** event listener on the `<ul>`, not one per `<li>`.

**Example:**

```
Click "Home": "Home" gets "selected" class, others don't
Click "About": "About" gets "selected", "Home" loses it
```

### Starter HTML

```html
<ul id="menu">
  <li>Home</li>
  <li>About</li>
  <li>Services</li>
  <li>Portfolio</li>
  <li>Contact</li>
</ul>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to listen for clicks on the whole list (the ul), but figure out which specific item (li) was clicked. Then I highlight that item and un-highlight all others. Only one item should be highlighted at a time.

### Step 2: Break Down

**Guided blocks:**

1. Select the ul element (NOT the individual li elements)
2. Add ONE click listener to the ul
3. Inside the handler, check if event.target is an li element
4. If it is, remove "selected" class from all li elements
5. Add "selected" class to the clicked li (event.target)

### Step 3: Map to Code

**Options shown:** `addEventListener("click", ...)`, `event.target`, `event.target.tagName`, `.querySelectorAll()`, `.forEach()`, `.classList.remove()`, `.classList.add()`

**Correct picks:** All of them

**System hint:** "When you click an `<li>` inside a `<ul>`, the click event **bubbles up** from the li to the ul (and further up to the body, html, and document). By listening on the ul, you catch clicks on ANY of its children. `event.target` tells you which child was actually clicked. This is called **event delegation** and it's powerful for three reasons: (1) one listener instead of many, (2) works for dynamically added items, (3) better performance with large lists."

### Step 4: Starter Code

```javascript
// Step 1: Select the ul#menu element
// Step 2: Add ONE click listener to the ul
// Step 3: Inside the handler, check if event.target is an LI
//         (hint: event.target.tagName === "LI")
// Step 4: Remove "selected" from all li elements
// Step 5: Add "selected" to event.target
```

### Step 5: Verify

```javascript
const menu = document.querySelector("#menu");
const items = menu.querySelectorAll("li");

// Click first item
items[0].click();
items[0].classList.contains("selected") === true   // true
items[1].classList.contains("selected") === false  // true

// Click third item
items[2].click();
items[2].classList.contains("selected") === true   // true
items[0].classList.contains("selected") === false  // true

// Only one selected at a time
const selectedCount = menu.querySelectorAll(".selected").length;
selectedCount === 1                                 // true

// Clicking the ul itself (not an li) does nothing
menu.click();
menu.querySelectorAll(".selected").length === 1    // true (unchanged)

// Dynamically added item works too
const newItem = document.createElement("li");
newItem.textContent = "Blog";
menu.appendChild(newItem);
newItem.click();
newItem.classList.contains("selected") === true    // true
```

### Solution

```javascript
const menu = document.querySelector("#menu");

menu.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    const allItems = menu.querySelectorAll("li");

    allItems.forEach(function (item) {
      item.classList.remove("selected");
    });

    event.target.classList.add("selected");
  }
});
```

### Explanation

"You used **event delegation**, one of the most important patterns in frontend development. Instead of attaching listeners to each child, you attach ONE listener to the parent and use `event.target` to identify which child was clicked. The `tagName` check ensures you only respond to li clicks, not clicks on the ul's padding or other elements. This pattern is essential because: (1) it's more efficient with many items, (2) it automatically works for items added after the listener is set up, and (3) frameworks like React use delegation internally for all event handling."

### Pattern Unlocked

> **"One listener on the parent handles all children"** = Event delegation: listen on parent, check `event.target.tagName` (or `.matches(selector)`), act on the specific child.

---

## Challenge 06: Form Submission Handler

### Problem Statement

The page has a form with name, email, and message fields. Write code that:

1. Prevents the default page reload on form submit
2. Reads the form values
3. Creates a confirmation card showing the submitted data inside `#output`
4. Resets the form

**Example:**

```
Fill in "Sara", "sara@test.com", "Hello!"
Click Submit
Page does NOT reload
Confirmation card appears showing the submitted data
Form fields are cleared
```

### Starter HTML

```html
<form id="contact-form">
  <input type="text" id="name" name="name" placeholder="Name" required />
  <input type="email" id="email" name="email" placeholder="Email" required />
  <textarea id="message" name="message" placeholder="Message" required></textarea>
  <button type="submit">Submit</button>
</form>
<div id="output"></div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** Forms normally reload the page when submitted. I need to stop that, grab the values the user typed, show a confirmation, and clear the form. Everything happens in JavaScript, no page reload.

### Step 2: Break Down

**Guided blocks:**

1. Select the form element
2. Add a "submit" event listener to the form
3. Call `event.preventDefault()` to stop the page from reloading
4. Read the values from each input field
5. Create a confirmation card div with the submitted data
6. Append the card to #output
7. Reset the form with `form.reset()`

### Step 3: Map to Code

**Options shown:** `addEventListener("submit", ...)`, `event.preventDefault()`, `.value`, `document.createElement()`, `.textContent`, `.appendChild()`, `form.reset()`

**Correct picks:** All of them

**System hint:** "By default, submitting a form sends data to a server and reloads the page. In modern web apps (SPAs), we prevent this with `event.preventDefault()` and handle everything in JavaScript. This is the foundation of every React/Vue/Angular form. `form.reset()` is a built-in method that clears all fields back to their default values."

### Step 4: Starter Code

```javascript
// Step 1: Select the form and #output
// Step 2: Add a "submit" event listener to the form
// Step 3: Call event.preventDefault() first thing
// Step 4: Read values from #name, #email, #message
// Step 5: Create a confirmation card with the data
// Step 6: Append it to #output
// Step 7: Reset the form
```

### Step 5: Verify

```javascript
const form = document.querySelector("#contact-form");
const output = document.querySelector("#output");

// Set form values
document.querySelector("#name").value = "Sara";
document.querySelector("#email").value = "sara@test.com";
document.querySelector("#message").value = "Hello!";

// Submit the form
form.dispatchEvent(new Event("submit", { cancelable: true }));

// Page did not reload (we're still here)
// Confirmation card exists
const card = output.querySelector("div");
card !== null                                          // true
card.textContent.includes("Sara")                      // true
card.textContent.includes("sara@test.com")             // true
card.textContent.includes("Hello!")                    // true

// Form is cleared
document.querySelector("#name").value === ""           // true
document.querySelector("#email").value === ""          // true

// Multiple submissions create multiple cards
document.querySelector("#name").value = "Ahmed";
document.querySelector("#email").value = "ahmed@test.com";
document.querySelector("#message").value = "Hi!";
form.dispatchEvent(new Event("submit", { cancelable: true }));
output.querySelectorAll("div").length === 2            // true
```

### Solution

```javascript
const form = document.querySelector("#contact-form");
const output = document.querySelector("#output");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  const card = document.createElement("div");
  card.classList.add("confirmation-card");

  const nameEl = document.createElement("p");
  nameEl.textContent = "Name: " + name;

  const emailEl = document.createElement("p");
  emailEl.textContent = "Email: " + email;

  const messageEl = document.createElement("p");
  messageEl.textContent = "Message: " + message;

  card.appendChild(nameEl);
  card.appendChild(emailEl);
  card.appendChild(messageEl);

  output.appendChild(card);

  form.reset();
});
```

### Explanation

"You used the **form prevention pattern**. `event.preventDefault()` is arguably the most important single line in modern frontend development. Without it, every form submission reloads the page, destroying your app state. With it, you take full control: read the data, validate it, send it via `fetch` (Track 4), show feedback, and reset the form. Every single-page application works this way. You also combined form handling (new) with element creation (Track 2) to build the confirmation card."

### Pattern Unlocked

> **"Stop the page from reloading on form submit"** = Form prevention: `addEventListener("submit", handler)` + `event.preventDefault()` + read `.value` from inputs + `form.reset()`.

---

## Challenge 07: Hover Preview

### Problem Statement

The page has a grid of thumbnail items, each with `data-title` and `data-preview` attributes. When the user hovers over a thumbnail, show the `data-preview` text and `data-title` as a heading inside `#preview-area`. When the mouse leaves, clear the preview.

**Example:**

```
Hover over "Sunset": preview shows title "Sunset" and description
Move away: preview is cleared
Hover over "Mountains": preview updates
```

### Starter HTML

```html
<div id="gallery">
  <div class="thumbnail" data-title="Sunset" data-preview="A beautiful orange sunset over the ocean.">Sunset</div>
  <div class="thumbnail" data-title="Mountains" data-preview="Snow-capped peaks reaching into the clouds.">Mountains</div>
  <div class="thumbnail" data-title="Forest" data-preview="A dense green forest with a winding trail.">Forest</div>
  <div class="thumbnail" data-title="City" data-preview="A bustling city skyline lit up at night.">City</div>
</div>
<div id="preview-area">
  <p class="empty-state">Hover over an image to see a preview.</p>
</div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to detect when the mouse enters and leaves each thumbnail. On enter, I read its data attributes and show them in the preview area. On leave, I clear the preview area.

### Step 2: Break Down

**Guided blocks:**

1. Select all thumbnail elements
2. Select the preview area
3. Add a "mouseover" listener to each thumbnail
4. Inside the mouseover handler: read data-title and data-preview, build and show the preview content
5. Add a "mouseout" listener to each thumbnail
6. Inside the mouseout handler: clear the preview area (restore empty state)

### Step 3: Map to Code

**Options shown:** `addEventListener("mouseover", ...)`, `addEventListener("mouseout", ...)`, `.dataset.title`, `.dataset.preview`, `.innerHTML`, `document.createElement()`, `.forEach()`

**Correct picks:** All of them

**System hint:** "Mouse events come in pairs: `'mouseover'` fires when the cursor enters an element, `'mouseout'` fires when it leaves. You almost always use them together. This is the basis of tooltips, hover cards, preview panels, and dropdown menus. The key rule: anything you show on mouseover, you should hide on mouseout."

### Step 4: Starter Code

```javascript
// Step 1: Select all .thumbnail elements and #preview-area
// Step 2: Add "mouseover" listener to each thumbnail
// Step 3: Inside: read data-title and data-preview, show in preview area
// Step 4: Add "mouseout" listener to each thumbnail
// Step 5: Inside: clear the preview area
```

### Step 5: Verify

```javascript
const preview = document.querySelector("#preview-area");
const thumbs = document.querySelectorAll(".thumbnail");

// Simulate hover on first thumbnail
thumbs[0].dispatchEvent(new Event("mouseover"));
preview.textContent.includes("Sunset")                        // true
preview.textContent.includes("A beautiful orange sunset")      // true

// Simulate hover on second
thumbs[1].dispatchEvent(new Event("mouseover"));
preview.textContent.includes("Mountains")                      // true

// Simulate mouse leave
thumbs[1].dispatchEvent(new Event("mouseout"));
preview.textContent.includes("Hover over")                     // true (empty state)
```

### Solution

```javascript
const thumbnails = document.querySelectorAll(".thumbnail");
const previewArea = document.querySelector("#preview-area");

thumbnails.forEach(function (thumb) {
  thumb.addEventListener("mouseover", function () {
    const title = thumb.dataset.title;
    const previewText = thumb.dataset.preview;

    previewArea.innerHTML = "";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const description = document.createElement("p");
    description.textContent = previewText;

    previewArea.appendChild(heading);
    previewArea.appendChild(description);
  });

  thumb.addEventListener("mouseout", function () {
    previewArea.innerHTML = "";
    const emptyState = document.createElement("p");
    emptyState.classList.add("empty-state");
    emptyState.textContent = "Hover over an image to see a preview.";
    previewArea.appendChild(emptyState);
  });
});
```

### Explanation

"You used the **hover effect pattern**: a mouseover/mouseout pair that shows and hides content. This is how product hover cards, user profile previews, and image galleries work. You combined hover events (new) with data attribute reading (Track 2/3), element creation (Track 2), and the clear-and-rebuild pattern (Track 2). Notice how patterns from earlier tracks keep appearing. The more you learn, the more tools you have to combine."

### Pattern Unlocked

> **"React to mouse entering and leaving"** = Hover effect: `addEventListener("mouseover", show)` + `addEventListener("mouseout", hide)` as a pair.

---

## Challenge 08: Accordion Toggle

### Problem Statement

The page has 3 accordion sections. Each section has a clickable `<button class="accordion-header">` and a `<div class="accordion-content">` that starts hidden. Clicking a header toggles its content open/closed. When one panel opens, all others close (only one panel open at a time).

**Example:**

```
Click "Section 1": Section 1 content opens, others closed
Click "Section 2": Section 2 opens, Section 1 closes
Click "Section 2" again: Section 2 closes, nothing open
```

### Starter HTML

```html
<div id="accordion">
  <div class="accordion-section">
    <button class="accordion-header">Section 1</button>
    <div class="accordion-content">Content for section 1. Lorem ipsum dolor sit amet.</div>
  </div>
  <div class="accordion-section">
    <button class="accordion-header">Section 2</button>
    <div class="accordion-content">Content for section 2. Consectetur adipiscing elit.</div>
  </div>
  <div class="accordion-section">
    <button class="accordion-header">Section 3</button>
    <div class="accordion-content">Content for section 3. Sed do eiusmod tempor.</div>
  </div>
</div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** Each header button controls the panel below it. Clicking should open that panel and close all others. If the panel is already open, clicking the same header should close it. Only zero or one panels can be open at any time.

### Step 2: Break Down

**Guided blocks:**

1. Select all accordion headers
2. Add a click listener to each header
3. Inside the handler, find the content panel next to this header (nextElementSibling)
4. Check if this panel is already open
5. Close ALL panels (remove "open" class from all content divs)
6. If the panel was NOT already open, open it (add "open" class)

### Step 3: Map to Code

**Options shown:** `document.querySelectorAll()`, `.addEventListener("click", ...)`, `.nextElementSibling`, `.classList.toggle()`, `.classList.contains()`, `.classList.remove()`, `.classList.add()`, `.forEach()`

**Correct picks:** All of them

**System hint:** "The trick is to close everything FIRST, then open the clicked one. But there's a gotcha: if the user clicks an already-open panel, it should close (not reopen). So you check `classList.contains('open')` BEFORE closing everything, and only open if it wasn't already open. `.nextElementSibling` gets the element immediately after the current one in the DOM, which is the content panel next to the header button."

### Step 4: Starter Code

```javascript
// Step 1: Select all .accordion-header buttons
// Step 2: Add click listener to each
// Step 3: Find the content panel (this header's nextElementSibling)
// Step 4: Check if it's already open
// Step 5: Close ALL panels
// Step 6: If it wasn't already open, open it
```

### Step 5: Verify

```javascript
const headers = document.querySelectorAll(".accordion-header");
const contents = document.querySelectorAll(".accordion-content");

// All start closed
contents[0].classList.contains("open") === false // true

// Click first header
headers[0].click();
contents[0].classList.contains("open") === true  // true
contents[1].classList.contains("open") === false // true
contents[2].classList.contains("open") === false // true

// Click second header (first closes, second opens)
headers[1].click();
contents[0].classList.contains("open") === false // true
contents[1].classList.contains("open") === true  // true

// Click second header again (closes it)
headers[1].click();
contents[1].classList.contains("open") === false // true

// All closed now
document.querySelectorAll(".accordion-content.open").length === 0 // true
```

### Solution

```javascript
const headers = document.querySelectorAll(".accordion-header");

headers.forEach(function (header) {
  header.addEventListener("click", function () {
    const content = header.nextElementSibling;
    const isAlreadyOpen = content.classList.contains("open");

    // Close all panels
    const allContents = document.querySelectorAll(".accordion-content");
    allContents.forEach(function (panel) {
      panel.classList.remove("open");
    });

    // If it wasn't open, open it
    if (!isAlreadyOpen) {
      content.classList.add("open");
    }
  });
});
```

### Explanation

"You built a real UI component. The **toggle on click pattern** combines click handling with class toggling and batch updates. The 'check before close-all' technique is important: saving the current state BEFORE modifying anything. If you close-all first and then check, the state is already gone. This same logic applies to tab systems, radio-button groups, and any 'one active at a time' UI. You also used `.nextElementSibling` to navigate between related elements, a skill from Track 2's parent-child navigation."

### Pattern Unlocked

> **"Toggle visibility on click, only one active at a time"** = Toggle on click: save current state, close all, re-open if it wasn't already open.

---

## Challenge 09: Live Search Filter

### Problem Statement

The page has a search input and a list of 20 items. As the user types, filter the list to show only items containing the search query (case-insensitive). Implement a **300ms debounce** so the filter runs only after the user stops typing, not on every keystroke.

**Example:**

```
Type "app" quickly: nothing happens until 300ms after last keystroke
After 300ms: only items containing "app" are visible
Clear input: all items visible again
```

### Starter HTML

```html
<div id="app">
  <input type="text" id="search" placeholder="Search items..." />
  <ul id="item-list">
    <li>Apple</li>
    <li>Banana</li>
    <li>Cherry</li>
    <li>Date</li>
    <li>Elderberry</li>
    <li>Fig</li>
    <li>Grape</li>
    <li>Honeydew</li>
    <li>Kiwi</li>
    <li>Lemon</li>
    <li>Mango</li>
    <li>Nectarine</li>
    <li>Orange</li>
    <li>Papaya</li>
    <li>Quince</li>
    <li>Raspberry</li>
    <li>Strawberry</li>
    <li>Tangerine</li>
    <li>Watermelon</li>
    <li>Pineapple</li>
  </ul>
</div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to filter the list based on what the user types, but I shouldn't filter on every single keystroke. Instead, I wait 300ms after the user stops typing, then run the filter. This prevents unnecessary work while the user is still mid-word.

### Step 2: Break Down

**Guided blocks:**

1. Select the search input and all list items
2. Create a variable to hold the debounce timer (starts as null)
3. Add an "input" event listener to the search input
4. Inside the handler, clear any existing timer with clearTimeout
5. Set a new timer with setTimeout (300ms delay)
6. Inside the timeout callback: read the search value, loop through items, hide non-matching items, show matching ones

### Step 3: Map to Code

**Options shown:** `addEventListener("input", ...)`, `setTimeout()`, `clearTimeout()`, `let timer`, `.value`, `.toLowerCase()`, `.includes()`, `.textContent`, `.style.display`, `"none"`, `""`

**Correct picks:** All of them

**System hint:** "Debouncing means: 'reset the timer every time the user does something, and only act when they stop.' On each keystroke, you (1) cancel the previous timer with `clearTimeout`, (2) start a new timer with `setTimeout`. If the user keeps typing, the timer keeps resetting and the filter never runs. Once they stop for 300ms, the timer finally fires. This is how Google's search bar, Slack's search, and every search-as-you-type feature works."

### Step 4: Starter Code

```javascript
// Step 1: Select the search input and all li elements
// Step 2: Create a timer variable (let timer = null)
// Step 3: Add "input" listener to the search input
// Step 4: Inside: clearTimeout(timer) to cancel previous timer
// Step 5: timer = setTimeout(function() { ... }, 300) to start new timer
// Step 6: Inside the timeout: filter items by showing/hiding based on match
```

### Step 5: Verify

```javascript
const search = document.querySelector("#search");
const items = document.querySelectorAll("#item-list li");

// Simulate typing "app" with debounce
search.value = "app";
search.dispatchEvent(new Event("input"));

// Immediately: nothing filtered yet (debounce waiting)
// (in real test, we'd check with a short delay that nothing changed)

// After 300ms+: filter applied
setTimeout(function () {
  const visible = Array.from(items).filter(li => li.style.display !== "none");
  visible.length === 2          // true (Apple, Pineapple)
  visible[0].textContent === "Apple"     // true
  visible[1].textContent === "Pineapple" // true
}, 350);

// Clear search shows all
setTimeout(function () {
  search.value = "";
  search.dispatchEvent(new Event("input"));

  setTimeout(function () {
    const allVisible = Array.from(items).filter(li => li.style.display !== "none");
    allVisible.length === 20     // true
  }, 350);
}, 700);
```

### Solution

```javascript
const searchInput = document.querySelector("#search");
const items = document.querySelectorAll("#item-list li");
let timer = null;

searchInput.addEventListener("input", function () {
  clearTimeout(timer);

  timer = setTimeout(function () {
    const query = searchInput.value.toLowerCase().trim();

    items.forEach(function (item) {
      const text = item.textContent.toLowerCase();

      if (query === "" || text.includes(query)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  }, 300);
});
```

### Explanation

"You used the **debounce pattern**. This is one of the most practical performance patterns in frontend development. Without debouncing, typing 'apple' fires 5 filter operations (a, ap, app, appl, apple). With debouncing, it fires just 1 (apple, after a 300ms pause). The combo of `clearTimeout` + `setTimeout` is the core mechanism: every new event cancels the old timer and starts a fresh one. Only when events stop coming does the timer finally expire and the function runs. You'll use debouncing for search, auto-save, window resize handlers, and API calls triggered by user input."

### Pattern Unlocked

> **"Wait until the user stops acting before responding"** = Debounce: `clearTimeout(timer)` + `timer = setTimeout(fn, delay)` inside an event handler.

---

## Challenge 10: Remove Listener After First Click

### Problem Statement

The page has a "Claim Reward" button. The **first click** should show a reward message in `#output` and disable the button. After the first click, the event listener should be **removed** so the handler truly cannot fire again, even if someone removes the disabled attribute from the button via dev tools.

**Example:**

```
Click "Claim Reward": message shows, button disabled, listener removed
Inspect element > remove disabled > click again: nothing happens
```

### Starter HTML

```html
<div id="app">
  <button id="claim-btn">Claim Reward</button>
  <div id="output"></div>
</div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need the button to work exactly once. After the first click, I show the reward, disable the button, AND remove the event listener entirely so the function can never run again.

### Step 2: Break Down

**Guided blocks:**

1. Select the button and #output
2. Define the handler as a **named function** (not anonymous)
3. Inside the handler: show the reward message, disable the button, remove the listener
4. Add the listener using the named function reference

### Step 3: Map to Code

**Options shown:** `addEventListener("click", namedFunction)`, `removeEventListener("click", namedFunction)`, `.disabled = true`, `document.createElement()`, `.textContent`, `function handleClaim() {}`

**Correct picks:** All of them

**System hint:** "`removeEventListener` requires the EXACT same function reference that was passed to `addEventListener`. Anonymous functions (written inline) can never be removed because you have no reference to them. That's why you need a named function stored in a variable. This is a critical detail. Listener cleanup prevents memory leaks in long-running apps and is essential when components are created and destroyed dynamically."

### Step 4: Starter Code

```javascript
// Step 1: Select the button and #output
// Step 2: Define a NAMED handler function
// Step 3: Inside the handler:
//   a. Show a reward message in #output
//   b. Disable the button (button.disabled = true)
//   c. Remove the listener (removeEventListener with the named function)
// Step 4: Add the listener using the named function
```

### Step 5: Verify

```javascript
const btn = document.querySelector("#claim-btn");
const output = document.querySelector("#output");

// First click works
btn.click();
output.textContent.includes("Reward") || output.textContent.includes("reward") // true
btn.disabled === true                                                           // true

// Remove disabled and try again
btn.disabled = false;
output.innerHTML = "";
btn.click();
output.textContent === ""   // true (handler was removed, nothing happened)
```

### Solution

```javascript
const button = document.querySelector("#claim-btn");
const output = document.querySelector("#output");

function handleClaim() {
  const message = document.createElement("p");
  message.textContent = "You claimed your reward! Check your inbox.";
  output.appendChild(message);

  button.disabled = true;
  button.removeEventListener("click", handleClaim);
}

button.addEventListener("click", handleClaim);
```

### Explanation

"You used the **event cleanup pattern**. Removing event listeners is the responsible counterpart to adding them. In this case, it ensures the action truly happens only once. In real apps, cleanup matters when: components unmount (React's `useEffect` cleanup), modals close, one-time animations finish, or resources need to be freed. The key lesson: always define handlers as named functions when you might need to remove them later. Anonymous functions are impossible to remove."

### Pattern Unlocked

> **"Remove a listener when it's no longer needed"** = Event cleanup: define a named function, `addEventListener(type, namedFn)`, then `removeEventListener(type, namedFn)` when done.

---

## Challenge 11: Keyboard Navigation

### Problem Statement

The page has a list of 5 items. Implement keyboard navigation:

- **ArrowDown** moves the `"focused"` class to the next item
- **ArrowUp** moves it to the previous item
- Focus wraps around (Down from last goes to first, Up from first goes to last)
- **Enter** adds the focused item's text to `#selected-output`

**Example:**

```
Page loads: first item has "focused"
Press ArrowDown: second item gets "focused"
Press ArrowDown x4: wraps back to first item
Press Enter: focused item's text appears in output
```

### Starter HTML

```html
<ul id="nav-list">
  <li>Dashboard</li>
  <li>Profile</li>
  <li>Settings</li>
  <li>Messages</li>
  <li>Logout</li>
</ul>
<div id="selected-output"></div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to track which item is currently focused (using a number index), listen for arrow keys to move the focus up and down the list, wrap around at the edges, and use Enter to confirm a selection.

### Step 2: Break Down

**Guided blocks:**

1. Select all list items and the output area
2. Set a current index variable to 0
3. Add "focused" class to the first item
4. Add a "keydown" listener to the document (global keyboard events)
5. On ArrowDown: remove "focused" from current, increment index, wrap if past end, add "focused" to new
6. On ArrowUp: same but decrement, wrap if below 0
7. On Enter: read focused item's text, append to output

### Step 3: Map to Code

**Options shown:** `addEventListener("keydown", ...)`, `event.key`, `"ArrowDown"`, `"ArrowUp"`, `"Enter"`, `.classList.add()`, `.classList.remove()`, `%` modulo for wrapping, `event.preventDefault()`

**Correct picks:** All of them

**System hint:** "Listening on `document` catches ALL keyboard events regardless of what's focused. The wrapping math is elegant: `(index + 1) % items.length` automatically wraps from the last index back to 0. For ArrowUp, use `(index - 1 + items.length) % items.length` to avoid negative numbers. Also call `event.preventDefault()` on arrow keys to stop the page from scrolling."

### Step 4: Starter Code

```javascript
// Step 1: Select all li items in #nav-list and #selected-output
// Step 2: Set currentIndex = 0, add "focused" to first item
// Step 3: Add "keydown" listener to document
// Step 4: On ArrowDown: move focus down (wrap around)
// Step 5: On ArrowUp: move focus up (wrap around)
// Step 6: On Enter: add focused item text to output
```

### Step 5: Verify

```javascript
const items = document.querySelectorAll("#nav-list li");
const output = document.querySelector("#selected-output");

// Starts focused on first item
items[0].classList.contains("focused") === true // true

// ArrowDown moves to next
document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
items[0].classList.contains("focused") === false // true
items[1].classList.contains("focused") === true  // true

// ArrowUp goes back
document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
items[0].classList.contains("focused") === true  // true

// ArrowUp from first wraps to last
document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
items[4].classList.contains("focused") === true  // true

// ArrowDown from last wraps to first
document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
items[0].classList.contains("focused") === true  // true

// Enter selects
document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
output.textContent.includes("Dashboard") === true // true

// Only one focused at a time
document.querySelectorAll("#nav-list .focused").length === 1 // true
```

### Solution

```javascript
const items = document.querySelectorAll("#nav-list li");
const output = document.querySelector("#selected-output");
let currentIndex = 0;

items[currentIndex].classList.add("focused");

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    items[currentIndex].classList.remove("focused");
    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].classList.add("focused");
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    items[currentIndex].classList.remove("focused");
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    items[currentIndex].classList.add("focused");
  }

  if (event.key === "Enter") {
    event.preventDefault();
    const selected = document.createElement("p");
    selected.textContent = items[currentIndex].textContent;
    output.appendChild(selected);
  }
});
```

### Explanation

"You built a keyboard navigation system. This is a real accessibility pattern used in dropdowns, command palettes (like VS Code's Ctrl+P), autocomplete menus, and any list that supports keyboard interaction. The modulo trick for wrapping (`% items.length`) is a mathematical pattern worth memorizing. `event.preventDefault()` on arrow keys stops the browser from scrolling the page while you're navigating the list. Keyboard accessibility is not optional in professional development, and this pattern is the starting point."

### Pattern Unlocked

> **"Navigate a list with arrow keys"** = Track an index, listen for ArrowUp/ArrowDown on document, use modulo for wrapping, update the visual "focused" indicator.

---

## Challenge 12: Drag-and-Drop Reorder

### Problem Statement

The page has a list of 5 draggable items (`draggable="true"`). Implement drag-and-drop so users can reorder items by dragging them to a new position in the list.

**Example:**

```
Drag "Item C" above "Item A"
Drop: list now shows [C, A, B, D, E]
Dragged item has "dragging" class while in motion
```

### Starter HTML

```html
<ul id="sortable-list">
  <li draggable="true">Item A</li>
  <li draggable="true">Item B</li>
  <li draggable="true">Item C</li>
  <li draggable="true">Item D</li>
  <li draggable="true">Item E</li>
</ul>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to handle three moments: when dragging starts (mark which item is being dragged), while dragging over other items (figure out where to insert), and when dropped (move the item to its new position).

### Step 2: Break Down

**Guided blocks:**

1. Select all list items
2. For each item, add a "dragstart" listener: store the dragged element, add "dragging" class
3. For each item, add a "dragend" listener: remove "dragging" class
4. On the ul, add a "dragover" listener: call preventDefault (required to allow drops), find the closest item being hovered over, insert the dragged element before it
5. On the ul, add a "drop" listener: finalize the position

### Step 3: Map to Code

**Options shown:** `addEventListener("dragstart", ...)`, `addEventListener("dragover", ...)`, `addEventListener("dragend", ...)`, `event.preventDefault()`, `event.dataTransfer`, `.classList.add("dragging")`, `.insertBefore()`, `.getBoundingClientRect()`, `event.clientY`

**Correct picks:** All of them

**System hint:** "The HTML5 drag-and-drop API requires three events working together: `dragstart` (save what's being dragged), `dragover` (must call `preventDefault()` or dropping is blocked), and `dragend` (cleanup). To figure out WHERE to insert the item, compare the mouse's Y position (`event.clientY`) with each list item's vertical midpoint. If the mouse is above an item's midpoint, insert before it."

### Step 4: Starter Code

```javascript
// Step 1: Select the list and all items
// Step 2: Track the currently dragged element (let draggedItem = null)
// Step 3: Add "dragstart" to each item: save reference, add "dragging" class
// Step 4: Add "dragend" to each item: remove "dragging" class
// Step 5: Add "dragover" to the ul: preventDefault, find the closest
//         non-dragging item under the cursor, insertBefore the dragged item
```

### Step 5: Verify

```javascript
const list = document.querySelector("#sortable-list");
const items = () => list.querySelectorAll("li");

// Initial order
items()[0].textContent === "Item A" // true
items()[2].textContent === "Item C" // true

// Simulate drag: move Item C before Item A
// (In real tests this uses DataTransfer mock)
const dragItem = items()[2]; // Item C
dragItem.dispatchEvent(new Event("dragstart"));
dragItem.classList.contains("dragging") === true // true

// After drop, verify reorder happened
// Item count unchanged
items().length === 5 // true
```

### Solution

```javascript
const list = document.querySelector("#sortable-list");
let draggedItem = null;

list.querySelectorAll("li").forEach(function (item) {
  item.addEventListener("dragstart", function () {
    draggedItem = item;
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", function () {
    item.classList.remove("dragging");
    draggedItem = null;
  });
});

list.addEventListener("dragover", function (event) {
  event.preventDefault();

  const closestItem = getClosestItem(list, event.clientY);

  if (closestItem) {
    list.insertBefore(draggedItem, closestItem);
  } else {
    list.appendChild(draggedItem);
  }
});

function getClosestItem(list, mouseY) {
  const items = list.querySelectorAll("li:not(.dragging)");
  let closest = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  items.forEach(function (item) {
    const box = item.getBoundingClientRect();
    const offset = mouseY - box.top - box.height / 2;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closest = item;
    }
  });

  return closest;
}
```

### Explanation

"You built a drag-and-drop reorder system. The `getClosestItem` function is the clever part: it calculates each item's vertical midpoint and finds the one closest to (but below) the mouse cursor. `getBoundingClientRect()` gives you an element's position and size on screen. This is simplified version of what libraries like SortableJS do internally. The HTML5 drag API is verbose but powerful, and understanding it helps you work with any drag library in the future."

### Pattern Unlocked

> **"Reorder items by dragging"** = Drag events: `dragstart` (save + mark), `dragover` (preventDefault + position), `dragend` (cleanup). Use `getBoundingClientRect()` to calculate insertion points.

---

## Challenge 13: Multi-Step Form Wizard

### Problem Statement

Build a 3-step form wizard. Each step is a `<div>` with form fields. Only one step is visible at a time. "Next" and "Back" buttons navigate between steps. The final step has a "Submit" button that collects all data and shows a summary.

**Example:**

```
Step 1: Name and email fields, Next button
Step 2: Address fields, Back and Next buttons
Step 3: Review step, Back and Submit buttons
Submit: show all collected data in #summary
```

### Starter HTML

```html
<div id="wizard">
  <div class="step-indicator">Step <span id="step-num">1</span> of 3</div>

  <div class="step" id="step-1">
    <h3>Personal Info</h3>
    <input type="text" id="w-name" placeholder="Full Name" />
    <input type="email" id="w-email" placeholder="Email" />
    <button class="next-btn">Next</button>
  </div>

  <div class="step hidden" id="step-2">
    <h3>Address</h3>
    <input type="text" id="w-city" placeholder="City" />
    <input type="text" id="w-country" placeholder="Country" />
    <button class="back-btn">Back</button>
    <button class="next-btn">Next</button>
  </div>

  <div class="step hidden" id="step-3">
    <h3>Review & Submit</h3>
    <div id="review-content"></div>
    <button class="back-btn">Back</button>
    <button id="submit-btn">Submit</button>
  </div>
</div>

<div id="summary" class="hidden"></div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to manage which step is visible, handle Next/Back navigation, populate the review step with collected data, and show a final summary on submit. The form data persists across steps.

### Step 2: Break Down

**Guided blocks:**

1. Track the current step number (start at 1)
2. Write a `showStep(n)` function: hide all steps, show step N, update the indicator
3. Add click listeners to all Next buttons: call showStep(currentStep + 1)
4. Add click listeners to all Back buttons: call showStep(currentStep - 1)
5. When showing step 3: populate #review-content with data from steps 1 and 2
6. Add click listener to Submit button: build and show the summary

### Step 3: Map to Code

**Options shown:** `addEventListener("click", ...)`, `.classList.add("hidden")`, `.classList.remove("hidden")`, `.value`, `.textContent`, `document.querySelector()`, `document.querySelectorAll()`, `let currentStep`

**Correct picks:** All of them

**System hint:** "Managing which 'screen' is visible is called **UI state management**. The simplest approach: track a number (currentStep), and have a function that hides everything then shows the right one. This same concept powers tabs, wizards, carousels, and even page routing in SPAs. The data from earlier steps stays in the input fields even when hidden, so you can read `.value` anytime."

### Step 4: Starter Code

```javascript
// Step 1: Track current step (let currentStep = 1)
// Step 2: Create showStep(n) function
//   - Hide all .step divs (add "hidden" class)
//   - Show step-N (remove "hidden" class)
//   - Update #step-num text
//   - If showing step 3, populate review content
// Step 3: Add click listeners to .next-btn buttons
// Step 4: Add click listeners to .back-btn buttons
// Step 5: Add click listener to #submit-btn
```

### Step 5: Verify

```javascript
// Step 1 visible initially
document.querySelector("#step-1").classList.contains("hidden") === false // true
document.querySelector("#step-2").classList.contains("hidden") === true  // true

// Fill step 1 and click Next
document.querySelector("#w-name").value = "Sara";
document.querySelector("#w-email").value = "sara@test.com";
document.querySelector("#step-1 .next-btn").click();
document.querySelector("#step-1").classList.contains("hidden") === true  // true
document.querySelector("#step-2").classList.contains("hidden") === false // true
document.querySelector("#step-num").textContent === "2"                  // true

// Fill step 2 and click Next
document.querySelector("#w-city").value = "Cairo";
document.querySelector("#w-country").value = "Egypt";
document.querySelector("#step-2 .next-btn").click();
document.querySelector("#step-3").classList.contains("hidden") === false // true

// Review shows collected data
const review = document.querySelector("#review-content").textContent;
review.includes("Sara")    // true
review.includes("Cairo")   // true

// Back button works
document.querySelector("#step-3 .back-btn").click();
document.querySelector("#step-2").classList.contains("hidden") === false // true

// Submit shows summary
document.querySelector("#step-2 .next-btn").click();
document.querySelector("#submit-btn").click();
document.querySelector("#summary").classList.contains("hidden") === false // true
document.querySelector("#summary").textContent.includes("Sara")          // true
```

### Solution

```javascript
let currentStep = 1;

function showStep(step) {
  const steps = document.querySelectorAll(".step");
  steps.forEach(function (s) {
    s.classList.add("hidden");
  });

  document.querySelector("#step-" + step).classList.remove("hidden");
  document.querySelector("#step-num").textContent = step;
  currentStep = step;

  if (step === 3) {
    populateReview();
  }
}

function populateReview() {
  const name = document.querySelector("#w-name").value;
  const email = document.querySelector("#w-email").value;
  const city = document.querySelector("#w-city").value;
  const country = document.querySelector("#w-country").value;

  const review = document.querySelector("#review-content");
  review.innerHTML = "";

  const items = [
    "Name: " + name,
    "Email: " + email,
    "City: " + city,
    "Country: " + country
  ];

  items.forEach(function (text) {
    const p = document.createElement("p");
    p.textContent = text;
    review.appendChild(p);
  });
}

// Next buttons
document.querySelectorAll(".next-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    showStep(currentStep + 1);
  });
});

// Back buttons
document.querySelectorAll(".back-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    showStep(currentStep - 1);
  });
});

// Submit button
document.querySelector("#submit-btn").addEventListener("click", function () {
  const name = document.querySelector("#w-name").value;
  const email = document.querySelector("#w-email").value;
  const city = document.querySelector("#w-city").value;
  const country = document.querySelector("#w-country").value;

  const summary = document.querySelector("#summary");
  summary.classList.remove("hidden");
  summary.innerHTML = "";

  const heading = document.createElement("h3");
  heading.textContent = "Submission Complete!";
  summary.appendChild(heading);

  const details = [
    "Name: " + name,
    "Email: " + email,
    "City: " + city,
    "Country: " + country
  ];

  details.forEach(function (text) {
    const p = document.createElement("p");
    p.textContent = text;
    summary.appendChild(p);
  });

  document.querySelector("#wizard").classList.add("hidden");
});
```

### Explanation

"You built a multi-step form wizard, which is one of the most common UI patterns on the web: checkout flows, onboarding, surveys, and registration. The key concept is **step-based UI state**: a single variable (`currentStep`) controls what's visible. The `showStep` function is a simple state-to-UI mapper: given a step number, make the UI match. This is conceptually identical to how frameworks manage views. You also coordinated multiple event listeners (Next, Back, Submit) that all interact with the same shared state."

### Pattern Unlocked

> **"Manage a multi-step UI"** = Track a step number, write a `showStep(n)` function that hides all and shows one, wire Next/Back buttons to increment/decrement.

---

## Challenge 14: Custom Tooltip System

### Problem Statement

Build a reusable tooltip system. Any element with a `data-tooltip` attribute should show a tooltip on hover. Write `initTooltips()` that sets up the system. The tooltip is a single shared `<div>` element positioned near the hovered element.

**Example:**

```
Hover over a button with data-tooltip="Save your work": tooltip appears above it
Move to another element: tooltip follows with new text
Move away: tooltip disappears
```

### Starter HTML

```html
<div id="toolbar">
  <button data-tooltip="Create a new file">New</button>
  <button data-tooltip="Save your work">Save</button>
  <button data-tooltip="Open an existing file">Open</button>
  <button>No Tooltip</button>
</div>
<p data-tooltip="This paragraph has a tooltip too">Hover over me</p>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to create one tooltip element and reuse it. When the mouse enters any element with data-tooltip, I position the tooltip near that element and show the text. When the mouse leaves, I hide it.

### Step 2: Break Down

**Guided blocks:**

1. Create a tooltip div element and add it to the body (starts hidden)
2. Select all elements with [data-tooltip] attribute
3. For each, add a "mouseover" listener: read data-tooltip, set tooltip text, position it, show it
4. For each, add a "mouseout" listener: hide the tooltip
5. Position using getBoundingClientRect() of the hovered element

### Step 3: Map to Code

**Options shown:** `document.createElement()`, `document.querySelectorAll("[data-tooltip]")`, `.dataset.tooltip`, `.getBoundingClientRect()`, `.style.top`, `.style.left`, `.style.display`, `addEventListener("mouseover", ...)`, `addEventListener("mouseout", ...)`

**Correct picks:** All of them

**System hint:** "`getBoundingClientRect()` gives you an element's position on screen: `top`, `left`, `bottom`, `right`, `width`, `height`. To place the tooltip above an element, set `tooltip.style.top` to the element's `top` minus the tooltip's height, and `tooltip.style.left` to center it horizontally. Using one shared tooltip element (instead of creating one per element) is more efficient and is how production tooltip libraries work."

### Step 4: Starter Code

```javascript
function initTooltips() {
  // Step 1: Create a tooltip div, add class "tooltip", append to body, hide it
  // Step 2: Select all elements with [data-tooltip]
  // Step 3: For each, add "mouseover" listener:
  //   a. Read data-tooltip text
  //   b. Set tooltip text
  //   c. Get element position with getBoundingClientRect()
  //   d. Position tooltip above the element
  //   e. Show tooltip
  // Step 4: For each, add "mouseout" listener: hide tooltip
}
```

### Step 5: Verify

```javascript
initTooltips();

const tooltip = document.querySelector(".tooltip");
const buttons = document.querySelectorAll("[data-tooltip]");

// Tooltip starts hidden
tooltip.style.display === "none"          // true

// Hover shows tooltip
buttons[0].dispatchEvent(new Event("mouseover"));
tooltip.style.display === "block"          // true
tooltip.textContent === "Create a new file" // true

// Hover different element updates
buttons[1].dispatchEvent(new Event("mouseover"));
tooltip.textContent === "Save your work"   // true

// Mouse leave hides
buttons[1].dispatchEvent(new Event("mouseout"));
tooltip.style.display === "none"           // true

// Button without data-tooltip has no effect
const noTooltipBtn = document.querySelector("button:not([data-tooltip])");
noTooltipBtn.dispatchEvent(new Event("mouseover"));
tooltip.style.display === "none"           // true
```

### Solution

```javascript
function initTooltips() {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  tooltip.style.position = "absolute";
  tooltip.style.display = "none";
  document.body.appendChild(tooltip);

  const elements = document.querySelectorAll("[data-tooltip]");

  elements.forEach(function (el) {
    el.addEventListener("mouseover", function () {
      const text = el.dataset.tooltip;
      tooltip.textContent = text;

      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      tooltip.style.display = "block";
      tooltip.style.top = (rect.top + scrollTop - tooltip.offsetHeight - 8) + "px";
      tooltip.style.left = (rect.left + scrollLeft + rect.width / 2 - tooltip.offsetWidth / 2) + "px";
    });

    el.addEventListener("mouseout", function () {
      tooltip.style.display = "none";
    });
  });
}

initTooltips();
```

### Explanation

"You built a reusable tooltip system from scratch. This is a simplified version of what libraries like Tippy.js and Floating UI do. The key concepts: (1) one shared DOM element for efficiency, (2) `getBoundingClientRect()` for element positioning, (3) accounting for page scroll, and (4) hover events as the trigger. You combined dynamic element creation (Track 2), hover events (Track 3), data attributes (Track 2), and positioning math. This is the most complex integration of patterns so far."

### Pattern Unlocked

> **"Position a floating element near another element"** = Use `getBoundingClientRect()` to get the target's position, calculate the floating element's `top` and `left` accounting for scroll, and show/hide on hover.

---

## Challenge 15: Interactive Quiz App

### Problem Statement

This is the **capstone challenge** for Track 3. Build a quiz app from data.

Given an array of question objects, the app should:

1. Show one question at a time with clickable option buttons
2. Clicking an option highlights it green (correct) or red (wrong)
3. After selecting, disable all options and show a "Next" button
4. After the last question, show the final score

**Data:**

```javascript
const questions = [
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Manager", "Digital Output Mode", "Document Order Method"],
    correctIndex: 0
  },
  {
    question: "Which method selects ONE element?",
    options: ["querySelectorAll", "getElementsByTagName", "querySelector", "getElementsByClassName"],
    correctIndex: 2
  },
  {
    question: "What does addEventListener do?",
    options: ["Removes an element", "Styles an element", "Attaches an event handler", "Creates an element"],
    correctIndex: 2
  },
  {
    question: "What is event.target?",
    options: ["The parent element", "The element that fired the event", "The document", "The event type"],
    correctIndex: 1
  },
  {
    question: "How do you stop a form from reloading the page?",
    options: ["event.stopPropagation()", "event.preventDefault()", "return false", "event.cancelBubble()"],
    correctIndex: 1
  }
];
```

### Starter HTML

```html
<div id="quiz-app">
  <div id="quiz-container"></div>
</div>
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to show a question with clickable answer buttons. When an answer is clicked, show if it's right or wrong, prevent more clicks, and offer a Next button. After all questions, show the score. I need to track the current question and the score.

### Step 2: Break Down

**Guided blocks:**

1. Track state: current question index (starts at 0), score (starts at 0)
2. Write `renderQuestion()`: clear the container, show the question text and option buttons
3. Add click listeners to option buttons (use event delegation on the options container)
4. On option click: check if selected index matches correctIndex, add "correct" or "wrong" class, disable all option buttons, update score if correct, show Next button
5. On Next click: increment question index, if more questions remain call renderQuestion, otherwise call showScore
6. Write `showScore()`: clear container, show final score

### Step 3: Map to Code

**Options shown:** `document.createElement()`, `.addEventListener("click", ...)`, `event.target`, `.classList.add()`, `.disabled = true`, `.textContent`, `.innerHTML = ""`, `let currentQuestion`, `let score`, `document.querySelectorAll()`

**Correct picks:** All of them

**System hint:** "This challenge combines almost every pattern from Track 3:
- **Click handlers** (option selection, Next button)
- **Event delegation** (one listener for all options)
- **Clear and rebuild** (new question each round)
- **Render from data** (questions array becomes UI)
- **State management** (currentQuestion, score)
- **Class toggling** (correct/wrong highlights)
- **Conditional logic** (last question triggers score screen)
Think of it as an assembly of everything you've learned."

### Step 4: Starter Code

```javascript
const questions = [
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Manager", "Digital Output Mode", "Document Order Method"],
    correctIndex: 0
  },
  {
    question: "Which method selects ONE element?",
    options: ["querySelectorAll", "getElementsByTagName", "querySelector", "getElementsByClassName"],
    correctIndex: 2
  },
  {
    question: "What does addEventListener do?",
    options: ["Removes an element", "Styles an element", "Attaches an event handler", "Creates an element"],
    correctIndex: 2
  },
  {
    question: "What is event.target?",
    options: ["The parent element", "The element that fired the event", "The document", "The event type"],
    correctIndex: 1
  },
  {
    question: "How do you stop a form from reloading the page?",
    options: ["event.stopPropagation()", "event.preventDefault()", "return false", "event.cancelBubble()"],
    correctIndex: 1
  }
];

let currentQuestion = 0;
let score = 0;

function renderQuestion() {
  // Step 1: Select and clear #quiz-container
  // Step 2: Get the current question object
  // Step 3: Create and append the question text (h2)
  // Step 4: Create a progress indicator (e.g., "Question 1 of 5")
  // Step 5: Create a div for options
  // Step 6: Loop through options, create a button for each
  //         Store the option index as data-index on each button
  // Step 7: Add click listener (delegation on options div or per button)
  // Step 8: On click: check answer, highlight, disable, show Next
}

function handleAnswer(selectedIndex) {
  // Step 1: Compare selectedIndex with questions[currentQuestion].correctIndex
  // Step 2: If correct: add "correct" class to button, increment score
  // Step 3: If wrong: add "wrong" class to clicked button,
  //         add "correct" class to the actual correct button
  // Step 4: Disable all option buttons
  // Step 5: Show a Next button (or "See Results" if last question)
}

function showScore() {
  // Step 1: Clear the container
  // Step 2: Show score: "You got X out of Y correct!"
  // Step 3: Add a "Play Again" button that resets and restarts
}

// Start the quiz
renderQuestion();
```

### Step 5: Verify

```javascript
const container = document.querySelector("#quiz-container");

// First question renders
container.querySelector("h2").textContent === "What does DOM stand for?" // true
container.querySelectorAll("button[data-index]").length === 4            // true

// Click correct answer
const correctBtn = container.querySelector('[data-index="0"]');
correctBtn.click();
correctBtn.classList.contains("correct") === true                        // true

// All option buttons disabled
const allBtns = container.querySelectorAll("button[data-index]");
let allDisabled = true;
allBtns.forEach(b => { if (!b.disabled) allDisabled = false; });
allDisabled === true                                                      // true

// Next button appeared
container.querySelector(".next-btn") !== null                            // true

// Click Next, second question shows
container.querySelector(".next-btn").click();
container.querySelector("h2").textContent === "Which method selects ONE element?" // true

// Click wrong answer
const wrongBtn = container.querySelector('[data-index="0"]');
wrongBtn.click();
wrongBtn.classList.contains("wrong") === true                            // true
// Correct answer also highlighted
container.querySelector('[data-index="2"]').classList.contains("correct") === true // true

// After all questions, score shows
// (simulate clicking through all remaining)
// Final screen shows score
```

### Solution

```javascript
const questions = [
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Manager", "Digital Output Mode", "Document Order Method"],
    correctIndex: 0
  },
  {
    question: "Which method selects ONE element?",
    options: ["querySelectorAll", "getElementsByTagName", "querySelector", "getElementsByClassName"],
    correctIndex: 2
  },
  {
    question: "What does addEventListener do?",
    options: ["Removes an element", "Styles an element", "Attaches an event handler", "Creates an element"],
    correctIndex: 2
  },
  {
    question: "What is event.target?",
    options: ["The parent element", "The element that fired the event", "The document", "The event type"],
    correctIndex: 1
  },
  {
    question: "How do you stop a form from reloading the page?",
    options: ["event.stopPropagation()", "event.preventDefault()", "return false", "event.cancelBubble()"],
    correctIndex: 1
  }
];

let currentQuestion = 0;
let score = 0;

function renderQuestion() {
  const container = document.querySelector("#quiz-container");
  container.innerHTML = "";

  const q = questions[currentQuestion];

  const progress = document.createElement("p");
  progress.classList.add("progress");
  progress.textContent = "Question " + (currentQuestion + 1) + " of " + questions.length;
  container.appendChild(progress);

  const questionEl = document.createElement("h2");
  questionEl.textContent = q.question;
  container.appendChild(questionEl);

  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");

  for (let i = 0; i < q.options.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = q.options[i];
    btn.classList.add("option-btn");
    btn.setAttribute("data-index", i);

    btn.addEventListener("click", function () {
      handleAnswer(i, optionsDiv);
    });

    optionsDiv.appendChild(btn);
  }

  container.appendChild(optionsDiv);
}

function handleAnswer(selectedIndex, optionsDiv) {
  const q = questions[currentQuestion];
  const buttons = optionsDiv.querySelectorAll(".option-btn");
  const correctIndex = q.correctIndex;

  if (selectedIndex === correctIndex) {
    score++;
    buttons[selectedIndex].classList.add("correct");
  } else {
    buttons[selectedIndex].classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
  }

  buttons.forEach(function (btn) {
    btn.disabled = true;
  });

  const container = document.querySelector("#quiz-container");
  const nextBtn = document.createElement("button");
  nextBtn.classList.add("next-btn");

  if (currentQuestion < questions.length - 1) {
    nextBtn.textContent = "Next Question";
    nextBtn.addEventListener("click", function () {
      currentQuestion++;
      renderQuestion();
    });
  } else {
    nextBtn.textContent = "See Results";
    nextBtn.addEventListener("click", function () {
      showScore();
    });
  }

  container.appendChild(nextBtn);
}

function showScore() {
  const container = document.querySelector("#quiz-container");
  container.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = "Quiz Complete!";
  container.appendChild(heading);

  const scoreText = document.createElement("p");
  scoreText.classList.add("score");
  scoreText.textContent = "You got " + score + " out of " + questions.length + " correct!";
  container.appendChild(scoreText);

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Play Again";
  restartBtn.classList.add("restart-btn");
  restartBtn.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    renderQuestion();
  });

  container.appendChild(restartBtn);
}

renderQuestion();
```

### Explanation

"Congratulations, you just built a complete interactive application. This capstone combines nearly everything from all three tracks:

- **Track 1 patterns**: Conditional logic, loops, array access, counter (score)
- **Track 2 patterns**: Clear and rebuild, render from data, create and append, class toggling, data attributes
- **Track 3 patterns**: Click handlers, disabling interactions, state management, dynamic listener attachment

This is genuinely close to how real quiz apps, onboarding flows, and interactive tutorials work. The only things missing are API calls for loading questions (Track 4) and animations (Track 5). Your pattern library now has 44 tools. You're thinking like a developer."

### Pattern Unlocked

> **"Build a complete interactive app from data and events"** = Combine state variables + render functions + event handlers + clear-and-rebuild. Each function has one job: render the UI, handle an action, or show results. Wire them together with events.

---

## Appendix: All Patterns Unlocked in Track 3

| # | Pattern | Plain English | Key Code |
|---|---|---|---|
| 1 | Click handler | React to user clicks | `addEventListener("click", fn)` |
| 2 | Event object reading | Inspect what triggered the event | `event.target`, `event.key` |
| 3 | Input sync | Live-update display from input | `"input"` event + `.value` |
| 4 | Enter key detection | Trigger on Enter press | `event.key === "Enter"` |
| 5 | Event delegation | One parent listener for all children | Listen on parent, check `event.target` |
| 6 | Form prevention | Stop default form reload | `event.preventDefault()` |
| 7 | Hover effect | React to mouse enter/leave | `"mouseover"` + `"mouseout"` pair |
| 8 | Toggle on click | Switch state per click | Click + classList.toggle + batch update |
| 9 | Debounce | Wait until user stops acting | `clearTimeout` + `setTimeout` |
| 10 | Event cleanup | Remove listener when done | `removeEventListener(type, namedFn)` |

---

## Cumulative Pattern Count

| Track | Patterns | Running Total |
|---|---|---|
| Track 1: Fundamentals | 19 | 19 |
| Track 2: DOM Manipulation | 15 | 34 |
| Track 3: Events & Interactions | 10 | 44 |

After completing Tracks 1-3, students have a solid foundation of 44 problem-solving patterns and can build interactive, data-driven UIs from scratch.

---

## Design Notes for Development Team

### Challenge Metadata (per challenge)

```json
{
  "id": "events-05",
  "track": "events-interactions",
  "order": 5,
  "title": "Event Delegation -- Clickable List",
  "difficulty": "medium",
  "estimatedMinutes": 12,
  "concepts": ["addEventListener", "event.target", "event delegation", "classList"],
  "patternsUnlocked": ["event-delegation"],
  "prerequisiteChallenges": ["events-04"],
  "hints": 3,
  "approaches": 1,
  "starterHTML": true,
  "starterCSS": true,
  "requiresPreview": true,
  "requiresInteractionLog": true
}
```

### Progression Rules

- Challenges 1-5: Guided mode by default
- Challenges 6-10: Semi-guided by default
- Challenges 11-14: Independent by default
- Challenge 15 (capstone): Independent encouraged, bonus badge without hints

### Badge

Completing all 15 challenges awards the **"Event Wrangler"** badge.

---

## Suggested Next Tracks

| Track | Title | Focus |
|---|---|---|
| Track 4 | Async JS | Callbacks, promises, fetch, async/await, loading states |
| Track 5 | CSS + JS Together | Dynamic styles, animations, transitions, scroll effects |
| Track 6 | Mini Components | Accordion, tabs, modal, tooltip, carousel from scratch |
| Track 7 | Real Patterns | Throttle, local storage, form validation, infinite scroll |
