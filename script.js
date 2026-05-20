// Student Registration System: validation, persistence, rendering, editing, and deletion.
const STORAGE_KEY = "studentRegistrationRecords";

const studentForm = document.getElementById("studentForm");
const studentNameInput = document.getElementById("studentName");
const studentIdInput = document.getElementById("studentId");
const branchInput = document.getElementById("branch");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("contact");
const submitButton = document.getElementById("submitButton");
const clearButton = document.getElementById("clearButton");
const tableBody = document.getElementById("studentTableBody");
const emptyState = document.getElementById("emptyState");
const recordCount = document.getElementById("recordCount");
const recordCountLabel = document.getElementById("recordCountLabel");

let students = loadStudents();
let editingIndex = null;

// Safely reads saved records and falls back to an empty list if storage is unavailable.
function loadStudents() {
  try {
    const savedStudents = localStorage.getItem(STORAGE_KEY);
    return savedStudents ? JSON.parse(savedStudents) : [];
  } catch (error) {
    alert("Saved records could not be loaded. Starting with an empty list.");
    return [];
  }
}

// Writes the current student list to localStorage after every add, edit, or delete.
function saveStudents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function getFormData() {
  return {
    name: studentNameInput.value.trim(),
    id: studentIdInput.value.trim(),
    branch: branchInput.value.trim(),
    email: emailInput.value.trim(),
    contact: contactInput.value.trim()
  };
}

// Collects all validation errors before alerting so users can fix everything at once.
function validateStudent(student) {
  const errors = [];
  const namePattern = /^[A-Za-z ]+$/;
  const numberPattern = /^\d+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!student.name || !student.id || !student.branch || !student.email || !student.contact) {
    errors.push("All fields are required. Empty rows cannot be added.");
  }

  if (student.name && !namePattern.test(student.name)) {
    errors.push("Student name must contain only letters and spaces.");
  }

  if (student.id && !numberPattern.test(student.id)) {
    errors.push("Student ID must be numeric.");
  }

  if (student.contact && !numberPattern.test(student.contact)) {
    errors.push("Contact number must be numeric.");
  }

  if (student.contact && numberPattern.test(student.contact) && student.contact.length < 10) {
    errors.push("Contact number must contain at least 10 digits.");
  }

  if (student.email && !emailPattern.test(student.email)) {
    errors.push("Email must be in a valid format.");
  }

  if (!student.branch) {
    errors.push("Branch cannot be blank.");
  }

  return errors;
}

function resetForm() {
  studentForm.reset();
  editingIndex = null;
  submitButton.textContent = "Add Student";
  studentNameInput.focus();
}

function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

function createActionButton(label, className, index) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.className = className;
  button.dataset.index = index;
  return button;
}

function updateRecordCounter() {
  recordCount.textContent = students.length;
  recordCountLabel.textContent = students.length === 1 ? "student" : "students";
}

// Rebuilds table rows from the current data so the UI always matches localStorage.
function renderStudents() {
  tableBody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    const actionsCell = document.createElement("td");
    const actions = document.createElement("div");

    actions.className = "row-actions";
    actions.append(
      createActionButton("Edit", "edit-button", index),
      createActionButton("Delete", "delete-button", index)
    );
    actionsCell.appendChild(actions);

    row.append(
      createCell(student.name),
      createCell(student.id),
      createCell(student.branch),
      createCell(student.email),
      createCell(student.contact),
      actionsCell
    );

    tableBody.appendChild(row);
  });

  updateRecordCounter();
  emptyState.hidden = students.length > 0;
}

function startEdit(index) {
  const student = students[index];

  studentNameInput.value = student.name;
  studentIdInput.value = student.id;
  branchInput.value = student.branch;
  emailInput.value = student.email;
  contactInput.value = student.contact;
  editingIndex = index;
  submitButton.textContent = "Save Changes";
  studentNameInput.focus();
}

function deleteStudent(index) {
  const student = students[index];
  const confirmed = confirm(`Delete the record for ${student.name}?`);

  if (!confirmed) {
    return;
  }

  students.splice(index, 1);
  saveStudents();
  renderStudents();
  resetForm();
}

studentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const student = getFormData();
  const errors = validateStudent(student);

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  if (editingIndex === null) {
    students.push(student);
  } else {
    students[editingIndex] = student;
  }

  saveStudents();
  renderStudents();
  resetForm();
});

clearButton.addEventListener("click", resetForm);

// Event delegation keeps edit and delete buttons working after every table render.
tableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const index = Number(button.dataset.index);

  if (button.classList.contains("edit-button")) {
    startEdit(index);
  }

  if (button.classList.contains("delete-button")) {
    deleteStudent(index);
  }
});

renderStudents();
