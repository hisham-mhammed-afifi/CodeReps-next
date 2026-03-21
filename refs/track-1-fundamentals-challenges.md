# Track 1: Fundamentals -- Challenge Design Document

## Platform Philosophy

Every challenge follows the **5-Step Problem-Solving Framework**:

1. **Understand** -- Rewrite the problem in plain English
2. **Break Down** -- Split it into smaller steps
3. **Map to Code** -- Match each step to a JS concept
4. **Write** -- Code the solution
5. **Verify** -- Test against expected output

Each challenge has 3 difficulty modes:

- **Guided**: All 5 steps are shown and interactive
- **Semi-Guided**: Steps 1-3 are available as optional hints
- **Independent**: Just the problem and the editor

---

## Challenge 01: The Greeting Machine

### Problem Statement

Write a function called `greet` that takes a person's name and returns a greeting message.

**Example:**

```
greet("Sara") --> "Hello, Sara! Welcome aboard."
greet("Ahmed") --> "Hello, Ahmed! Welcome aboard."
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to create a function that receives a name and combines it into a greeting sentence.

### Step 2: Break Down

**Prompt to user:** "What are the smaller steps?"

**Guided blocks (drag to arrange):**

1. Create a function that accepts one input (the name)
2. Build a sentence that includes the name
3. Return the full sentence

### Step 3: Map to Code

**Prompt to user:** "Which JS concepts do you need?"

**Options shown:** `function`, `parameter`, `string concatenation`, `template literal`, `return`

**Correct picks:** `function`, `parameter`, `template literal` or `string concatenation`, `return`

**System hint:** "You need a way to define reusable logic (function), receive input (parameter), combine text with a value (template literal), and send the result back (return)."

### Step 4: Starter Code

```javascript
function greet(name) {
  // Step 1: Build the greeting message using the name
  // Step 2: Return the message
}
```

### Step 5: Verify

**Test cases:**

```javascript
greet("Sara")    // Expected: "Hello, Sara! Welcome aboard."
greet("Ahmed")   // Expected: "Hello, Ahmed! Welcome aboard."
greet("")        // Expected: "Hello, ! Welcome aboard."
```

### Solution

```javascript
function greet(name) {
  const message = `Hello, ${name}! Welcome aboard.`;
  return message;
}
```

### Explanation

"You used a **template literal** (backtick string with `${}`) to insert the name into a sentence. This is how developers build dynamic text -- combining fixed words with changing values. You'll use this pattern constantly in real projects."

### Pattern Unlocked

> **"Insert a value into text"** = Template literal: `` `text ${variable} more text` ``

---

## Challenge 02: Even or Odd

### Problem Statement

Write a function called `evenOrOdd` that takes a number and returns `"Even"` if the number is even, or `"Odd"` if it's odd.

**Example:**

```
evenOrOdd(4)  --> "Even"
evenOrOdd(7)  --> "Odd"
evenOrOdd(0)  --> "Even"
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to check if a number is divisible by 2. If yes, return "Even". If not, return "Odd".

### Step 2: Break Down

**Guided blocks:**

1. Take a number as input
2. Check if the number is divisible by 2
3. If yes, return "Even"
4. If no, return "Odd"

### Step 3: Map to Code

**Options shown:** `function`, `if/else`, `modulo (%)`, `return`, `comparison (===)`

**Correct picks:** All of them

**System hint:** "The **modulo operator (%)** gives you the remainder after division. If `number % 2` equals `0`, the number is even. Use **if/else** to pick between two outcomes."

### Step 4: Starter Code

```javascript
function evenOrOdd(number) {
  // Step 1: Check if the number is divisible by 2 (hint: use %)
  // Step 2: Return "Even" or "Odd" based on the check
}
```

### Step 5: Verify

```javascript
evenOrOdd(4)    // Expected: "Even"
evenOrOdd(7)    // Expected: "Odd"
evenOrOdd(0)    // Expected: "Even"
evenOrOdd(-3)   // Expected: "Odd"
evenOrOdd(100)  // Expected: "Even"
```

### Solution

```javascript
function evenOrOdd(number) {
  if (number % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}
```

### Explanation

"You used the **modulo operator (%)** to find the remainder. This is one of the most common patterns in programming: checking divisibility. You also used **if/else** to branch your logic into two paths. Almost every program has decisions like this."

### Pattern Unlocked

> **"Choose between two options"** = `if/else`
> **"Check if a number is divisible"** = `number % divisor === 0`

---

## Challenge 03: Find the Longest Word

### Problem Statement

Write a function called `longestWord` that takes an array of words and returns the longest one. If two words have the same length, return the first one.

**Example:**

```
longestWord(["cat", "elephant", "dog"])       --> "elephant"
longestWord(["hi", "hey", "hello"])           --> "hello"
longestWord(["same", "size", "word"])         --> "same"
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to go through a list of words, compare their lengths, and keep track of which one is the longest.

### Step 2: Break Down

**Guided blocks:**

1. Start by assuming the first word is the longest
2. Go through each word in the array
3. Compare the current word's length to the longest so far
4. If the current word is longer, it becomes the new longest
5. After checking all words, return the longest one

### Step 3: Map to Code

**Options shown:** `for loop`, `.forEach()`, `variable`, `.length`, `if`, `comparison (>)`, `array`

**Correct picks:** `for loop` or `.forEach()`, `variable`, `.length`, `if`, `comparison (>)`

**System hint:** "You need to **remember** the longest word so far (variable), **go through each item** (loop), and **compare** lengths (if + .length). This is called the 'tracker pattern' -- you loop through a list while tracking the best match."

### Step 4: Starter Code

```javascript
function longestWord(words) {
  // Step 1: Create a variable to store the longest word (start with the first one)
  // Step 2: Loop through the array starting from the second word
  // Step 3: If the current word is longer, update your variable
  // Step 4: After the loop, return the longest word
}
```

### Step 5: Verify

```javascript
longestWord(["cat", "elephant", "dog"])    // Expected: "elephant"
longestWord(["hi", "hey", "hello"])        // Expected: "hello"
longestWord(["same", "size", "word"])      // Expected: "same"
longestWord(["only"])                      // Expected: "only"
longestWord(["a", "bb", "ccc", "dd"])      // Expected: "ccc"
```

### Solution

```javascript
function longestWord(words) {
  let longest = words[0];

  for (let i = 1; i < words.length; i++) {
    if (words[i].length > longest.length) {
      longest = words[i];
    }
  }

  return longest;
}
```

### Explanation

"You used the **tracker pattern**: start with an initial guess, loop through everything, and update your tracker whenever you find something better. This same pattern works for finding the smallest number, the cheapest item, the oldest person -- any time you need to find 'the most' or 'the least' of something in a list."

### Pattern Unlocked

> **"Find the best/biggest/smallest in a list"** = Tracker pattern: save the first item, loop and compare, update when you find a better match.

---

## Challenge 04: Double the Numbers

### Problem Statement

Write a function called `doubleAll` that takes an array of numbers and returns a new array where every number is doubled.

**Example:**

```
doubleAll([1, 2, 3])      --> [2, 4, 6]
doubleAll([10, 0, -5])    --> [20, 0, -10]
doubleAll([])              --> []
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to take each number in the array, multiply it by 2, and put all the results in a new array.

### Step 2: Break Down

**Guided blocks:**

1. Create a new empty array for the results
2. Go through each number in the input array
3. Multiply the current number by 2
4. Add the doubled number to the results array
5. Return the results array

### Step 3: Map to Code

**Options shown:** `for loop`, `.map()`, `.push()`, `new array []`, `multiplication (*)`, `return`

**Correct picks (approach A):** `for loop`, `.push()`, `new array []`, `multiplication (*)`
**Correct picks (approach B):** `.map()`, `multiplication (*)`

**System hint:** "There are two ways to do this. The manual way: create an empty array, loop, push doubled values. The cleaner way: use `.map()`, which transforms every item in an array and returns a new one. Both are valid, but `.map()` is the pattern developers use most."

### Step 4: Starter Code

```javascript
function doubleAll(numbers) {
  // Approach A (manual):
  // Step 1: Create an empty results array
  // Step 2: Loop through numbers
  // Step 3: Push each number * 2 into results
  // Step 4: Return results

  // Approach B (using .map):
  // Return numbers.map(...) with a function that doubles each number
}
```

### Step 5: Verify

```javascript
doubleAll([1, 2, 3])     // Expected: [2, 4, 6]
doubleAll([10, 0, -5])   // Expected: [20, 0, -10]
doubleAll([])             // Expected: []
doubleAll([100])          // Expected: [200]
```

### Solution (Approach A)

```javascript
function doubleAll(numbers) {
  const results = [];
  for (let i = 0; i < numbers.length; i++) {
    results.push(numbers[i] * 2);
  }
  return results;
}
```

### Solution (Approach B)

```javascript
function doubleAll(numbers) {
  return numbers.map(function (num) {
    return num * 2;
  });
}
```

### Explanation

"When you need to **transform every item** in an array into something new, that's the **map pattern**. `.map()` takes a function, runs it on each item, and collects all the results into a new array. It's one of the most used array methods in frontend development -- you'll see it everywhere in React, Vue, and Angular when rendering lists."

### Pattern Unlocked

> **"Transform each item into something new"** = `.map(item => newValue)`

---

## Challenge 05: Count the Vowels

### Problem Statement

Write a function called `countVowels` that takes a string and returns the number of vowels (a, e, i, o, u) in it. Uppercase vowels count too.

**Example:**

```
countVowels("hello")      --> 2
countVowels("APPLE")      --> 2
countVowels("rhythm")     --> 0
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to go through each letter in a string, check if it's a vowel, and count how many vowels I find.

### Step 2: Break Down

**Guided blocks:**

1. Define what the vowels are
2. Start a counter at 0
3. Go through each character in the string
4. Convert the character to lowercase (to handle uppercase letters)
5. If the character is a vowel, increase the counter
6. Return the counter

### Step 3: Map to Code

**Options shown:** `for loop`, `.toLowerCase()`, `.includes()`, `variable (counter)`, `if`, `string`, `array`

**Correct picks:** `for loop`, `.toLowerCase()`, `.includes()`, `variable (counter)`, `if`

**System hint:** "Store the vowels as a string or array like `'aeiou'`. Use `.includes()` to check if a character exists in that list. Use `.toLowerCase()` so you don't have to check uppercase separately. This is the **counter pattern**: loop through items and count matches."

### Step 4: Starter Code

```javascript
function countVowels(text) {
  // Step 1: Define the vowels (as a string "aeiou" or an array)
  // Step 2: Create a counter variable starting at 0
  // Step 3: Loop through each character in the text
  // Step 4: Convert the character to lowercase
  // Step 5: Check if it's a vowel, if yes increment the counter
  // Step 6: Return the counter
}
```

### Step 5: Verify

```javascript
countVowels("hello")       // Expected: 2
countVowels("APPLE")       // Expected: 2
countVowels("rhythm")      // Expected: 0
countVowels("aeiou")       // Expected: 5
countVowels("")            // Expected: 0
countVowels("JavaScript")  // Expected: 3
```

### Solution

```javascript
function countVowels(text) {
  const vowels = "aeiou";
  let count = 0;

  for (let i = 0; i < text.length; i++) {
    if (vowels.includes(text[i].toLowerCase())) {
      count++;
    }
  }

  return count;
}
```

### Explanation

"You used the **counter pattern**: start at zero, loop through items, increment when a condition is met. This pattern is useful any time you need to count occurrences -- how many times something appears, how many items match a condition, etc. You also learned to normalize data with `.toLowerCase()` before comparing, which prevents bugs from case mismatches."

### Pattern Unlocked

> **"Count how many items match a condition"** = Counter pattern: `let count = 0`, loop, `if (condition) count++`, return count.

---

## Challenge 06: Reverse a String

### Problem Statement

Write a function called `reverseString` that takes a string and returns it reversed. Do not use the built-in `.reverse()` method.

**Example:**

```
reverseString("hello")   --> "olleh"
reverseString("world")   --> "dlrow"
reverseString("a")       --> "a"
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to read the string from the end to the start and build a new string in that order.

### Step 2: Break Down

**Guided blocks:**

1. Create an empty string to hold the reversed result
2. Loop through the original string from the last character to the first
3. Add each character to the result string
4. Return the result

### Step 3: Map to Code

**Options shown:** `for loop (backward)`, `string concatenation (+)`, `.length`, `variable`, `index access []`

**Correct picks:** All of them

**System hint:** "To go backward through a string, start your loop at `string.length - 1` and decrease. Use `string[i]` to access each character. Build the result by adding characters one by one with `+`. This is the **accumulator pattern**: start empty and build up a result piece by piece."

### Step 4: Starter Code

```javascript
function reverseString(text) {
  // Step 1: Create an empty string for the result
  // Step 2: Loop from the last character to the first
  // Step 3: Add each character to the result
  // Step 4: Return the result
}
```

### Step 5: Verify

```javascript
reverseString("hello")     // Expected: "olleh"
reverseString("world")     // Expected: "dlrow"
reverseString("a")         // Expected: "a"
reverseString("")          // Expected: ""
reverseString("12345")     // Expected: "54321"
```

### Solution

```javascript
function reverseString(text) {
  let reversed = "";

  for (let i = text.length - 1; i >= 0; i--) {
    reversed += text[i];
  }

  return reversed;
}
```

### Explanation

"You used the **accumulator pattern**: start with an empty value and build it up inside a loop. You also learned to **loop backward**, which is useful whenever you need to process things in reverse order. The key insight is that `string.length - 1` gives you the last index, because indexes start at 0."

### Pattern Unlocked

> **"Build up a result piece by piece"** = Accumulator pattern: start empty, add in a loop.
> **"Go through something backward"** = `for (let i = arr.length - 1; i >= 0; i--)`

---

## Challenge 07: Remove Duplicates

### Problem Statement

Write a function called `removeDuplicates` that takes an array and returns a new array with all duplicate values removed. Keep the first occurrence of each value.

**Example:**

```
removeDuplicates([1, 2, 2, 3, 3, 3])          --> [1, 2, 3]
removeDuplicates(["a", "b", "a", "c", "b"])   --> ["a", "b", "c"]
removeDuplicates([1])                          --> [1]
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to go through the array and keep only items I haven't seen before. If an item already appeared, skip it.

### Step 2: Break Down

**Guided blocks:**

1. Create a new empty array for unique items
2. Go through each item in the original array
3. Check if the item is already in the new array
4. If not, add it
5. If yes, skip it
6. Return the new array

### Step 3: Map to Code

**Options shown:** `for loop`, `.includes()`, `.push()`, `new array []`, `if`, `Set`

**Correct picks (approach A):** `for loop`, `.includes()`, `.push()`, `new array []`, `if`
**Correct picks (approach B):** `Set`

**System hint:** "The manual approach uses `.includes()` to check 'have I seen this before?' before pushing. The shortcut is `new Set(array)`, which automatically removes duplicates -- but learning the manual way first helps you understand the logic behind it."

### Step 4: Starter Code

```javascript
function removeDuplicates(items) {
  // Step 1: Create an empty array for unique items
  // Step 2: Loop through each item
  // Step 3: Check if the item is already in the unique array (.includes)
  // Step 4: If not, push it in
  // Step 5: Return the unique array
}
```

### Step 5: Verify

```javascript
removeDuplicates([1, 2, 2, 3, 3, 3])         // Expected: [1, 2, 3]
removeDuplicates(["a", "b", "a", "c", "b"])  // Expected: ["a", "b", "c"]
removeDuplicates([1])                         // Expected: [1]
removeDuplicates([])                          // Expected: []
removeDuplicates([5, 5, 5, 5])               // Expected: [5]
```

### Solution (Approach A)

```javascript
function removeDuplicates(items) {
  const unique = [];

  for (let i = 0; i < items.length; i++) {
    if (!unique.includes(items[i])) {
      unique.push(items[i]);
    }
  }

  return unique;
}
```

### Solution (Approach B)

```javascript
function removeDuplicates(items) {
  return [...new Set(items)];
}
```

### Explanation

"You used the **filter-and-collect pattern**: loop through items, check a condition, and collect only the ones that pass. The `.includes()` check acts as a memory -- 'have I seen this before?' This is a fundamental pattern for filtering data. The `Set` shortcut is great to know, but understanding the manual approach helps you solve similar problems where `Set` won't work."

### Pattern Unlocked

> **"Keep only items that meet a condition"** = Filter-and-collect: create empty array, loop, check condition, push if true.
> **"Quick way to remove duplicates"** = `[...new Set(array)]`

---

## Challenge 08: FizzBuzz

### Problem Statement

Write a function called `fizzBuzz` that takes a number `n` and returns an array of strings from 1 to `n` where:

- Numbers divisible by 3 are replaced with `"Fizz"`
- Numbers divisible by 5 are replaced with `"Buzz"`
- Numbers divisible by both 3 and 5 are replaced with `"FizzBuzz"`
- All other numbers stay as strings (e.g., `"1"`, `"2"`)

**Example:**

```
fizzBuzz(5)  --> ["1", "2", "Fizz", "4", "Buzz"]
fizzBuzz(15) --> ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to loop from 1 to n. For each number, I check divisibility rules in a specific order and add the right string to a result array.

### Step 2: Break Down

**Guided blocks:**

1. Create an empty results array
2. Loop from 1 to n
3. For each number, check: is it divisible by BOTH 3 and 5? (check this first!)
4. If not, check: is it divisible by 3?
5. If not, check: is it divisible by 5?
6. If none of the above, use the number itself as a string
7. Push the result to the array
8. Return the array

### Step 3: Map to Code

**Options shown:** `for loop`, `if/else if/else`, `modulo (%)`, `.push()`, `String()`, `array`

**Correct picks:** All of them

**System hint:** "The order of checks matters! Check divisible by both (3 AND 5) first. If you check for 3 first, you'll never reach the 'both' case because 15 is divisible by 3, so that check catches it first. This is a **priority chain** -- when conditions overlap, check the most specific one first."

### Step 4: Starter Code

```javascript
function fizzBuzz(n) {
  // Step 1: Create an empty results array
  // Step 2: Loop from 1 to n
  // Step 3: Check divisible by BOTH 3 and 5 first --> push "FizzBuzz"
  // Step 4: Else check divisible by 3 --> push "Fizz"
  // Step 5: Else check divisible by 5 --> push "Buzz"
  // Step 6: Else push the number as a string
  // Step 7: Return the results
}
```

### Step 5: Verify

```javascript
fizzBuzz(1)   // Expected: ["1"]
fizzBuzz(3)   // Expected: ["1", "2", "Fizz"]
fizzBuzz(5)   // Expected: ["1", "2", "Fizz", "4", "Buzz"]
fizzBuzz(15)  // Expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]
```

### Solution

```javascript
function fizzBuzz(n) {
  const results = [];

  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      results.push("FizzBuzz");
    } else if (i % 3 === 0) {
      results.push("Fizz");
    } else if (i % 5 === 0) {
      results.push("Buzz");
    } else {
      results.push(String(i));
    }
  }

  return results;
}
```

### Explanation

"FizzBuzz combines several patterns you've learned: looping, checking divisibility with modulo, and branching with if/else. The new lesson here is **condition ordering** -- when conditions overlap, put the most specific one first. This shows up everywhere: form validation (check empty before checking format), permission checks (check admin before checking user), and error handling."

### Pattern Unlocked

> **"Multiple overlapping conditions"** = Priority chain: check most specific condition first with `if/else if/else`.

---

## Challenge 09: Sum of Positives

### Problem Statement

Write a function called `sumPositives` that takes an array of numbers and returns the sum of only the positive numbers (greater than 0).

**Example:**

```
sumPositives([1, -2, 3, -4, 5])   --> 9
sumPositives([-1, -2, -3])         --> 0
sumPositives([10, 20, 30])         --> 60
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to go through the numbers, pick only the positive ones, and add them together.

### Step 2: Break Down

**Guided blocks:**

1. Start a sum variable at 0
2. Loop through each number in the array
3. Check if the number is greater than 0
4. If yes, add it to the sum
5. Return the sum

### Step 3: Map to Code

**Options shown:** `for loop`, `.filter()`, `.reduce()`, `if`, `variable`, `comparison (>)`, `addition (+=)`

**Correct picks (approach A):** `for loop`, `if`, `variable`, `comparison (>)`, `addition (+=)`
**Correct picks (approach B):** `.filter()`, `.reduce()`

**System hint:** "This combines two patterns you already know: the **counter pattern** (but adding values instead of counting) and the **filter concept** (only processing items that pass a condition). You're essentially doing a **conditional accumulation** -- add up values, but only the ones that meet a rule."

### Step 4: Starter Code

```javascript
function sumPositives(numbers) {
  // Step 1: Create a sum variable starting at 0
  // Step 2: Loop through each number
  // Step 3: If the number is positive (> 0), add it to sum
  // Step 4: Return the sum
}
```

### Step 5: Verify

```javascript
sumPositives([1, -2, 3, -4, 5])   // Expected: 9
sumPositives([-1, -2, -3])        // Expected: 0
sumPositives([10, 20, 30])        // Expected: 60
sumPositives([])                  // Expected: 0
sumPositives([0, 0, 0])           // Expected: 0
```

### Solution

```javascript
function sumPositives(numbers) {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
      sum += numbers[i];
    }
  }

  return sum;
}
```

### Explanation

"This is the **conditional accumulation pattern** -- like the counter pattern, but instead of adding 1, you add the value itself. This pattern appears in real apps constantly: calculate total cart price (sum prices of items), total hours worked (sum only entries marked 'completed'), etc."

### Pattern Unlocked

> **"Add up values that match a condition"** = Conditional accumulation: `let sum = 0`, loop, `if (condition) sum += value`.

---

## Challenge 10: Capitalize First Letter

### Problem Statement

Write a function called `capitalizeFirst` that takes a string and returns it with the first letter capitalized and the rest unchanged.

**Example:**

```
capitalizeFirst("hello")     --> "Hello"
capitalizeFirst("javaScript") --> "JavaScript"
capitalizeFirst("a")          --> "A"
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to take the first character, make it uppercase, and then attach the rest of the string to it.

### Step 2: Break Down

**Guided blocks:**

1. Get the first character of the string
2. Convert it to uppercase
3. Get the rest of the string (everything after the first character)
4. Combine them together
5. Return the result

### Step 3: Map to Code

**Options shown:** `string[0]`, `.toUpperCase()`, `.slice()`, `string concatenation (+)`, `return`

**Correct picks:** All of them

**System hint:** "Strings in JS are like arrays -- you can access individual characters with `string[0]`. Use `.slice(1)` to get everything from index 1 onward. Then combine the uppercase first letter with the rest. This is the **split-transform-join pattern**: break something apart, change one piece, put it back together."

### Step 4: Starter Code

```javascript
function capitalizeFirst(text) {
  // Step 1: Get the first character and make it uppercase
  // Step 2: Get the rest of the string (from index 1 onward)
  // Step 3: Combine them and return
}
```

### Step 5: Verify

```javascript
capitalizeFirst("hello")       // Expected: "Hello"
capitalizeFirst("javaScript")  // Expected: "JavaScript"
capitalizeFirst("a")           // Expected: "A"
capitalizeFirst("HELLO")       // Expected: "HELLO"
capitalizeFirst("123abc")      // Expected: "123abc"
```

### Solution

```javascript
function capitalizeFirst(text) {
  return text[0].toUpperCase() + text.slice(1);
}
```

### Explanation

"You used the **split-transform-join pattern**: isolate the part you want to change, transform it, and reassemble. This pattern is everywhere in string manipulation -- formatting names, cleaning user input, building URLs. Notice how `.slice(1)` gives you 'everything from index 1 to the end' without needing to specify the end."

### Pattern Unlocked

> **"Change one part of a string"** = Split-transform-join: extract the part, change it, recombine.
> **"Get part of a string"** = `.slice(start)` or `.slice(start, end)`

---

## Challenge 11: Find the Index

### Problem Statement

Write a function called `findIndex` that takes an array and a target value. Return the index of the first occurrence of the target. If the target is not found, return `-1`. Do not use the built-in `.indexOf()` method.

**Example:**

```
findIndex([10, 20, 30, 40], 30)     --> 2
findIndex(["a", "b", "c"], "d")     --> -1
findIndex([5, 5, 5], 5)             --> 0
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to check each item in the array from start to end. The moment I find the target, I return its position. If I go through the whole array without finding it, I return -1.

### Step 2: Break Down

**Guided blocks:**

1. Loop through the array from start to end
2. For each item, check if it equals the target
3. If it matches, return the current index immediately
4. If the loop ends without finding it, return -1

### Step 3: Map to Code

**Options shown:** `for loop`, `if`, `comparison (===)`, `return`, `index variable (i)`

**Correct picks:** All of them

**System hint:** "Notice the **early return** here: you return INSIDE the loop as soon as you find what you're looking for. You don't need to check the rest. The `-1` return is AFTER the loop -- it only runs if nothing was found. This is the **search pattern**."

### Step 4: Starter Code

```javascript
function findIndex(array, target) {
  // Step 1: Loop through the array
  // Step 2: If current item equals target, return the index
  // Step 3: If loop finishes without finding it, return -1
}
```

### Step 5: Verify

```javascript
findIndex([10, 20, 30, 40], 30)    // Expected: 2
findIndex(["a", "b", "c"], "d")    // Expected: -1
findIndex([5, 5, 5], 5)            // Expected: 0
findIndex([], 1)                   // Expected: -1
findIndex([1, 2, 3], 3)            // Expected: 2
```

### Solution

```javascript
function findIndex(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    }
  }

  return -1;
}
```

### Explanation

"You used the **linear search pattern**: go through each item one by one until you find what you're looking for. The **early return** is key -- returning inside the loop exits the entire function immediately. This is efficient because you stop as soon as you succeed. The '-1 at the end' convention is standard in JS to mean 'not found'."

### Pattern Unlocked

> **"Find something in a list"** = Linear search: loop through, return immediately when found, return -1 after the loop if not found.
> **"Stop as soon as you find it"** = Early return inside a loop.

---

## Challenge 12: Group by Property

### Problem Statement

Write a function called `groupByAge` that takes an array of person objects and returns an object where the keys are ages and the values are arrays of names.

**Example:**

```javascript
const people = [
  { name: "Sara", age: 25 },
  { name: "Ahmed", age: 30 },
  { name: "Lina", age: 25 },
  { name: "Omar", age: 30 },
  { name: "Noor", age: 20 }
];

groupByAge(people)
// Expected:
// {
//   25: ["Sara", "Lina"],
//   30: ["Ahmed", "Omar"],
//   20: ["Noor"]
// }
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to organize people into groups based on their age. Each age becomes a key, and the value is a list of names that share that age.

### Step 2: Break Down

**Guided blocks:**

1. Create an empty object to hold the groups
2. Loop through each person
3. Get the person's age
4. Check if that age already exists as a key in the object
5. If not, create it with an empty array
6. Push the person's name into the array for that age
7. Return the grouped object

### Step 3: Map to Code

**Options shown:** `for loop`, `object`, `if`, `property access []`, `push()`, `hasOwnProperty` or `in` operator

**Correct picks:** `for loop`, `object`, `if`, `property access []`, `.push()`

**System hint:** "You're building a **lookup object** (also called a dictionary or hash map). The key insight is checking 'does this group exist yet?' before adding to it. If not, create it first. This is the **grouping pattern** and it's used constantly in real apps: group messages by date, group products by category, group transactions by type."

### Step 4: Starter Code

```javascript
function groupByAge(people) {
  // Step 1: Create an empty object for groups
  // Step 2: Loop through each person
  // Step 3: Get the person's age
  // Step 4: If this age doesn't exist as a key yet, create it with an empty array
  // Step 5: Push the person's name into the array for that age
  // Step 6: Return the groups object
}
```

### Step 5: Verify

```javascript
groupByAge([
  { name: "Sara", age: 25 },
  { name: "Ahmed", age: 30 },
  { name: "Lina", age: 25 }
])
// Expected: { 25: ["Sara", "Lina"], 30: ["Ahmed"] }

groupByAge([{ name: "Solo", age: 99 }])
// Expected: { 99: ["Solo"] }

groupByAge([])
// Expected: {}
```

### Solution

```javascript
function groupByAge(people) {
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
}
```

### Explanation

"You used the **grouping pattern**: build an object where keys represent categories and values are arrays of matching items. The `if (!groups[age])` check is critical -- it initializes the group the first time you encounter a new category. This is one of the most practical patterns in frontend development: grouping API data for display, organizing form entries, categorizing search results."

### Pattern Unlocked

> **"Organize items into categories"** = Grouping pattern: create empty object, loop, create key if missing, push value into the key's array.

---

## Challenge 13: Flatten an Array

### Problem Statement

Write a function called `flatten` that takes an array of arrays and returns a single flat array containing all elements.

**Example:**

```
flatten([[1, 2], [3, 4], [5]])           --> [1, 2, 3, 4, 5]
flatten([["a", "b"], ["c"]])             --> ["a", "b", "c"]
flatten([[1], [], [2, 3]])               --> [1, 2, 3]
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I have an array where each item is itself an array. I need to merge all inner arrays into one single array.

### Step 2: Break Down

**Guided blocks:**

1. Create an empty result array
2. Loop through each inner array
3. Loop through each item in the inner array
4. Push each item into the result
5. Return the result

### Step 3: Map to Code

**Options shown:** `nested for loops`, `.concat()`, `.push()`, `spread operator (...)`, `.flat()`, `new array []`

**Correct picks (approach A):** `nested for loops`, `.push()`, `new array []`
**Correct picks (approach B):** `for loop`, `.concat()` or `spread operator (...)`
**Correct picks (approach C):** `.flat()`

**System hint:** "This needs a **nested loop** -- a loop inside a loop. The outer loop goes through each inner array. The inner loop goes through each item in that inner array. This is the first time you're dealing with **two levels of data**, which is very common when working with API responses and complex datasets."

### Step 4: Starter Code

```javascript
function flatten(arrays) {
  // Step 1: Create an empty result array
  // Step 2: Loop through each inner array
  // Step 3: Loop through each item in the inner array
  // Step 4: Push each item into the result
  // Step 5: Return the result
}
```

### Step 5: Verify

```javascript
flatten([[1, 2], [3, 4], [5]])      // Expected: [1, 2, 3, 4, 5]
flatten([["a", "b"], ["c"]])        // Expected: ["a", "b", "c"]
flatten([[1], [], [2, 3]])          // Expected: [1, 2, 3]
flatten([])                         // Expected: []
flatten([[1]])                      // Expected: [1]
```

### Solution (Approach A)

```javascript
function flatten(arrays) {
  const result = [];

  for (let i = 0; i < arrays.length; i++) {
    for (let j = 0; j < arrays[i].length; j++) {
      result.push(arrays[i][j]);
    }
  }

  return result;
}
```

### Solution (Approach B)

```javascript
function flatten(arrays) {
  let result = [];

  for (let i = 0; i < arrays.length; i++) {
    result = result.concat(arrays[i]);
  }

  return result;
}
```

### Explanation

"You used **nested loops** -- a loop inside a loop. The outer loop handles the 'rows' (inner arrays), the inner loop handles the 'columns' (individual items). This is the foundation for working with tables, grids, matrices, and any multi-level data structure. You'll see nested loops when rendering table rows, processing spreadsheet data, and traversing tree-like structures."

### Pattern Unlocked

> **"Process items inside items"** = Nested loops: outer loop for groups, inner loop for items within each group.

---

## Challenge 14: Create a Lookup Object

### Problem Statement

Write a function called `createLookup` that takes an array of `[key, value]` pairs and returns an object where each key maps to its value.

**Example:**

```javascript
createLookup([["name", "Sara"], ["age", "25"], ["city", "Cairo"]])
// Expected: { name: "Sara", age: "25", city: "Cairo" }

createLookup([["a", 1], ["b", 2]])
// Expected: { a: 1, b: 2 }

createLookup([])
// Expected: {}
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I have pairs of data (like label and value). I need to turn them into an object where the first item of each pair becomes the key and the second becomes the value.

### Step 2: Break Down

**Guided blocks:**

1. Create an empty object
2. Loop through each pair in the array
3. The first element of the pair is the key
4. The second element of the pair is the value
5. Set `object[key] = value`
6. Return the object

### Step 3: Map to Code

**Options shown:** `for loop`, `object`, `property access []`, `destructuring`, `array index [0] [1]`

**Correct picks:** `for loop`, `object`, `property access []`, and optionally `destructuring`

**System hint:** "Each pair is a small array like `['name', 'Sara']`. You access the key with `pair[0]` and the value with `pair[1]`. Or use **destructuring**: `const [key, value] = pair`. Then set `object[key] = value`. This is the **object-building pattern** and it's essential for transforming data from one shape to another."

### Step 4: Starter Code

```javascript
function createLookup(pairs) {
  // Step 1: Create an empty object
  // Step 2: Loop through each pair
  // Step 3: Extract the key (first item) and value (second item)
  // Step 4: Add them to the object
  // Step 5: Return the object
}
```

### Step 5: Verify

```javascript
createLookup([["name", "Sara"], ["age", "25"], ["city", "Cairo"]])
// Expected: { name: "Sara", age: "25", city: "Cairo" }

createLookup([["a", 1], ["b", 2]])
// Expected: { a: 1, b: 2 }

createLookup([])
// Expected: {}

createLookup([["x", true]])
// Expected: { x: true }
```

### Solution

```javascript
function createLookup(pairs) {
  const result = {};

  for (let i = 0; i < pairs.length; i++) {
    const key = pairs[i][0];
    const value = pairs[i][1];
    result[key] = value;
  }

  return result;
}
```

### Explanation

"You used the **object-building pattern**: start with an empty object and populate it in a loop using dynamic keys. The `object[variable]` syntax (bracket notation) is what lets you use a variable as a key name -- this is different from `object.key` which uses the literal word 'key'. This pattern is everywhere: converting API data, building config objects, creating caches."

### Pattern Unlocked

> **"Build an object from data"** = Object-building pattern: create `{}`, loop, set `obj[key] = value`.
> **"Use a variable as an object key"** = Bracket notation: `obj[variableName]`

---

## Challenge 15: Chain of Transformations

### Problem Statement

Write a function called `processOrders` that takes an array of order objects and returns the total revenue from completed orders only. Each order has a `status` ("completed" or "pending") and a `total` (number).

**Example:**

```javascript
const orders = [
  { id: 1, status: "completed", total: 50 },
  { id: 2, status: "pending", total: 30 },
  { id: 3, status: "completed", total: 100 },
  { id: 4, status: "pending", total: 20 },
  { id: 5, status: "completed", total: 75 }
];

processOrders(orders) --> 225
```

### Step 1: Understand

**Prompt to user:** "Rewrite this problem in your own words."

**Expected understanding:** I need to go through the orders, pick only the completed ones, and add up their totals.

### Step 2: Break Down

**Guided blocks:**

1. Start a revenue variable at 0
2. Loop through each order
3. Check if the order's status is "completed"
4. If yes, add the order's total to revenue
5. Return revenue

### Step 3: Map to Code

**Options shown:** `for loop`, `.filter()`, `.reduce()`, `if`, `comparison (===)`, `addition (+=)`, `object property (.status, .total)`

**Correct picks (approach A):** `for loop`, `if`, `comparison (===)`, `addition (+=)`, `object property access`
**Correct picks (approach B):** `.filter()`, `.reduce()`

**System hint:** "This challenge combines multiple patterns you've learned: **conditional accumulation** (add only if a condition is met) plus **object property access** (reading `.status` and `.total` from each order). In real apps, this is exactly how you process data: filter by a condition, then compute a result from the filtered items."

### Step 4: Starter Code

```javascript
function processOrders(orders) {
  // Step 1: Create a revenue variable at 0
  // Step 2: Loop through each order
  // Step 3: If the order's status is "completed"
  // Step 4: Add its total to revenue
  // Step 5: Return revenue
}
```

### Step 5: Verify

```javascript
processOrders([
  { id: 1, status: "completed", total: 50 },
  { id: 2, status: "pending", total: 30 },
  { id: 3, status: "completed", total: 100 }
])
// Expected: 150

processOrders([])
// Expected: 0

processOrders([{ id: 1, status: "pending", total: 999 }])
// Expected: 0

processOrders([{ id: 1, status: "completed", total: 42 }])
// Expected: 42
```

### Solution (Approach A)

```javascript
function processOrders(orders) {
  let revenue = 0;

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].status === "completed") {
      revenue += orders[i].total;
    }
  }

  return revenue;
}
```

### Solution (Approach B)

```javascript
function processOrders(orders) {
  return orders
    .filter(order => order.status === "completed")
    .reduce((sum, order) => sum + order.total, 0);
}
```

### Explanation

"This is the **filter-then-compute pattern** and it's the most common data processing pattern in frontend development. Almost every real app does this: show only active users, calculate total sales this month, count unread messages. You're combining two patterns into a pipeline: first narrow down the data, then extract what you need. Approach B shows the functional style with `.filter().reduce()` -- this reads like a sentence: 'filter completed orders, then reduce to total'."

### Pattern Unlocked

> **"Process only some items and compute a result"** = Filter-then-compute: narrow down with a condition, then accumulate/count/transform the result.

---

## Appendix: All Patterns Unlocked in Track 1

| # | Pattern Name | Plain English | JS Code |
|---|---|---|---|
| 1 | Template literal | Insert a value into text | `` `text ${variable}` `` |
| 2 | If/else | Choose between two options | `if (condition) {} else {}` |
| 3 | Modulo check | Check divisibility | `n % d === 0` |
| 4 | Tracker | Find the best/biggest/smallest | Save first, loop and compare, update |
| 5 | Map | Transform each item | `.map(item => newValue)` |
| 6 | Counter | Count matches | `let count = 0; if (match) count++` |
| 7 | Accumulator | Build up a result piece by piece | Start empty, add in loop |
| 8 | Backward loop | Process in reverse | `for (i = len-1; i >= 0; i--)` |
| 9 | Filter-and-collect | Keep items matching a condition | Empty array, loop, push if true |
| 10 | Set dedup | Quick duplicate removal | `[...new Set(arr)]` |
| 11 | Priority chain | Handle overlapping conditions | `if/else if/else`, specific first |
| 12 | Conditional accumulation | Sum values matching a condition | `if (cond) sum += value` |
| 13 | Split-transform-join | Change part of a string | Extract, modify, recombine |
| 14 | Linear search + early return | Find something in a list | Loop, return when found, -1 after |
| 15 | Grouping | Organize into categories | Object with arrays as values |
| 16 | Nested loops | Process items inside items | Outer loop + inner loop |
| 17 | Object building | Create object from data | `obj[key] = value` in a loop |
| 18 | Bracket notation | Variable as object key | `obj[variable]` |
| 19 | Filter-then-compute | Process subset and calculate | Filter, then accumulate |

---

## Design Notes for Development Team

### Challenge Metadata (per challenge)

```json
{
  "id": "fundamentals-01",
  "track": "fundamentals",
  "order": 1,
  "title": "The Greeting Machine",
  "difficulty": "easy",
  "estimatedMinutes": 5,
  "concepts": ["function", "parameter", "template-literal", "return"],
  "patternsUnlocked": ["template-literal"],
  "prerequisiteChallenges": [],
  "hints": 3,
  "approaches": 1
}
```

### Guided Mode UI Components Needed

- **Rewrite prompt**: Text input where user rephrases the problem
- **Breakdown builder**: Draggable blocks that user arranges in order
- **Concept picker**: Clickable tags representing JS concepts, with confirm/hint feedback
- **Code editor**: Monaco-based with starter code and step comments
- **Test runner**: Auto-run tests with pass/fail indicators
- **Pattern card**: Revealed after completion, added to user's "Pattern Library"

### Progression Rules

- Challenges 1-5: Always start in Guided mode
- Challenges 6-10: User can choose Guided or Semi-Guided
- Challenges 11-15: User can choose any mode, encouraged to try Independent
- After completing all 15, user unlocks Track 2 and can revisit any challenge in Independent mode
