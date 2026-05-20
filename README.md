# Student Registration System

A responsive student registration system built with HTML, CSS, and JavaScript. It lets users add, edit, delete, and persist student records in the browser using localStorage.

## Files

- `index.html` - page markup and form/table structure
- `styles.css` - responsive layout and styling
- `script.js` - validation, rendering, localStorage, edit, and delete logic
- `README.md` - project usage notes

## Form Fields

- Student name
- Student ID
- Branch
- Email
- Contact number

## Validation Rules

- Student name must contain only letters and spaces.
- Student ID must be numeric.
- Branch cannot be blank.
- Email must be in a valid format.
- Contact number must be numeric with at least 10 digits.
- Empty rows are rejected before they can be added.

## Usage

1. Open `index.html` in a browser.
2. Fill in all required fields.
3. Click `Add Student` to save a new record.
4. Click `Edit` to prefill the form, then click `Save Changes` to update the record.
5. Click `Delete` to remove a record after confirming the prompt.

Saved records remain available after page reloads because they are stored in localStorage.

## ZIP Package

The project package is `student-registration-system.zip`. It contains only the four required files at the root level, with no nested directories.
