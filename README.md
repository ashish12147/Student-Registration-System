# Student Registration System

A polished student registration system built with HTML, CSS, and JavaScript. The app validates student details, renders records dynamically, persists data with localStorage, and adapts across desktop, tablet, and mobile screens.

## Project Files

- `index.html` - semantic page structure, registration form, and student table
- `styles.css` - two-column layout, responsive rules, card styling, and color theme
- `script.js` - validation, localStorage persistence, dynamic rendering, edit, and delete logic
- `README.md` - setup and usage instructions

## Features

- Add student records with name, ID, branch, email, and contact number.
- Validate all inputs before saving.
- Edit existing records through the same form.
- Delete records after a confirmation prompt.
- Show the total number of registered students.
- Store records in localStorage so they remain after page reloads.
- Scroll long student lists inside the registered students card.

## Validation Rules

- Student name accepts letters and spaces only.
- Student ID accepts numbers only.
- Branch cannot be blank.
- Email must be in a valid format.
- Contact number accepts numbers only and must contain at least 10 digits.

## How to Run

Open `index.html` in any modern browser such as Chrome, Edge, Firefox, or Safari. No build step or server is required.

## Repository Contents

The app is included directly in the repository as source files. Open `index.html` to run it.
