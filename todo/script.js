// Grab the elements we need from the page
const taskInput = document.getElementById("task-input");
const addBtn    = document.getElementById("add-btn");
const taskList  = document.getElementById("task-list");

// addTask() reads the input, creates a new list item, and appends it
function addTask() {
  const text = taskInput.value.trim(); // remove leading/trailing whitespace

  // Don't add an empty task
  if (text === "") {
    taskInput.focus();
    return;
  }

  // Build the <li> element
  const li = document.createElement("li");

  // Checkbox to mark the task done
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // When checked, toggle the "done" class which strikes through the text
  checkbox.addEventListener("change", function () {
    li.classList.toggle("done", checkbox.checked);
  });

  // The task text
  const span = document.createElement("span");
  span.textContent = text;

  // Delete button removes the entire list item
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", function () {
    li.remove();
  });

  // Put the pieces together and add to the list
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // Clear the input and put the cursor back so the user can type again
  taskInput.value = "";
  taskInput.focus();
}

// "Add" button click
addBtn.addEventListener("click", addTask);

// Press Enter in the input field — same as clicking Add
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
