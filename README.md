# Lab 2: Custom Hooks Implementation

This project is built with React, Vite, and TypeScript. In this lab, we created two reusable custom React hooks: `usePagination` and `useDebounce`. We also made two demo cards to show how both hooks work in a browser.

---

## What We Built

### 1. `usePagination` Hook
- **Purpose**: Helps split a long list of items into smaller pages.
- **Inputs**:
  - `totalItems`: How many items exist in total (e.g., 123 items).
  - `itemsPerPage`: How many items to show on one page (defaults to 10, with choices like 5, 10, 15, 20).
  - `initialPage`: Which page number to start on (defaults to 1).
- **Return Values**:
  - `currentPage`: The page you are currently viewing.
  - `totalPages`: Total number of pages calculated using `Math.ceil`.
  - `startIndex` and `endIndex`: The exact start and end item numbers for slicing the list.
  - `itemsOnCurrentPage`: Tells you how many items are showing right now (especially helpful on the last page).
  - `setPage(pageNumber)`: Lets you click any page number pill to jump directly to it.
  - `nextPage()` and `prevPage()`: Moves forward or back by one page.
  - `canNextPage` and `canPrevPage`: Booleans that disable the Previous or Next buttons when you reach the first or last page.

### 2. `useDebounce` Hook
- **Purpose**: Waits for the user to stop typing before running a function or search.
- **Inputs**:
  - `value`: The text from the input box.
  - `delay`: Time to wait in milliseconds (defaults to 500ms).
- **Return Value**:
  - `debouncedValue`: Updates only after the user stops typing for 500ms.
- **Cleanup**: Uses `clearTimeout` inside `useEffect` so every new keystroke resets the timer and stops extra memory leaks or old runs.

---

## Demo Components

1. **`PaginationDemo.tsx`**:
   - Shows 123 simulated items.
   - Has a dropdown to change items per page to 5, 10, 15, or 20.
   - Shows "Page X of Y" and "Showing items X - Y".
   - Shows numbered pill buttons at the bottom to jump to any page.
   - Disables "Previous" on page 1 and "Next" on the last page.

2. **`DebounceSearchDemo.tsx`**:
   - Has an input box where you can type fast.
   - Shows the immediate text right away.
   - Shows the debounced text after 500ms.
   - Shows a list of 3 simulated search results that update when debouncing finishes.
   - Logs `Searching for: [text]` into the developer console.

---

## Problems I Faced and How I Fixed Them

1. **Duplicate Identifiers and Capitalization in TypeScript**:
   - *Problem*: I had small naming typos like `DebounceSearchTerm` with a capital letter in one place and `debounceSearchTerm` with a lowercase letter in another place. I also missed the `s` in `demoStyles`.
   - *Fix*: TypeScript caught these immediately. I made all variable names match using camelCase and corrected the style object names.

2. **Two Pagination Cards Showing on the Screen**:
   - *Problem*: When I opened my browser, two Pagination cards showed up, and the Debounce card was completely missing.
   - *Fix*: I accidentally saved the pagination code inside both `PaginationDemo.tsx` and `DebounceSearchDemo.tsx`. I replaced `DebounceSearchDemo.tsx` with the correct debounce code, saved both files, and both unique cards appeared cleanly.

3. **Matching the Lab Preview UI**:
   - *Problem*: At first, I had a fixed 8 items per page and a 2-column box layout, but the example solution showed an "Items per page" dropdown (with 5, 10, 15, 20) and a single vertical list.
   - *Fix*: I added state for `itemsPerPage`, connected a `<select>` dropdown, and changed the display to an ordered list with the exact summary text.

---

## Reflection Questions

### 1. Why do we extract logic into Custom Hooks?
Custom hooks let us write logic once and reuse it across multiple components without copy-pasting code. It keeps our components clean and focused just on showing the UI, while the hooks do the heavy math, timers, and state work behind the scenes.

### 2. Why is the cleanup function important in `useDebounce`?
If you type 10 letters quickly, 10 different timers would start at the same time without cleanup. The cleanup function runs `clearTimeout` every time the text changes, canceling the old timer and starting a fresh 500ms countdown. This stops unnecessary updates and keeps the app fast.

### 3. How does `usePagination` handle edge cases?
If there are 0 items, `totalPages` stays safely at 1 so the page number never becomes 0 or negative. It also checks boundaries so `setPage`, `nextPage`, and `prevPage` can never go below page 1 or past the last page.

---

