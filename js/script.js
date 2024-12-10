/*
Use variables, if statements, loops, arrays, functions, callbacks, and events.
On add.html:
- Validate task name with regex.
- Capture due date and priority.
- If valid, add to tasks array.

On index.html:
- Render tasks from tasks array into the table.

On about.html:
- Validate user preferences (display name and daily limit) with regex and conditions.
- Show alerts on success/failure.

Demonstrations:
- Regex, arrays, DOM manipulation, events.
*/
// Load tasks from localStorage or initialize empty
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Load theme from localStorage or default to 'light'
let currentTheme = localStorage.getItem('theme') || 'light';

// Apply theme on page load
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);

    const bodyId = document.body.id;

    if (bodyId === 'homePage') {
        // Render tasks in index.html
        const taskTableBody = document.querySelector('#task-table-body');
        if (taskTableBody) {
            renderTasks(taskTableBody);
        }
    }

    if (bodyId === 'addPage') {
        // Handle add task form in add.html
        const addForm = document.querySelector('#add-task-form');
        if (addForm) {
            addForm.addEventListener('submit', handleAddTask);
        }
    }

    if (bodyId === 'aboutPage') {
        // Handle theme form in about.html
        const themeForm = document.querySelector('#theme-form');
        if (themeForm) {
            themeForm.addEventListener('submit', handleThemeForm);
        }

        // Set dropdown to current theme
        const themeSelect = document.querySelector('#theme-select');
        if (themeSelect) {
            themeSelect.value = currentTheme;
        }
    }
});

function renderTasks(taskTableBody) {
    taskTableBody.innerHTML = ''; // Clear table
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = task.name;
        row.appendChild(nameCell);

        const dueCell = document.createElement('td');
        dueCell.textContent = task.due;
        row.appendChild(dueCell);

        const priorityCell = document.createElement('td');
        priorityCell.textContent = task.priority;
        row.appendChild(priorityCell);

        const actionCell = document.createElement('td');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('btn');
        removeBtn.addEventListener('click', () => {
            removeTask(index, taskTableBody);
        });
        actionCell.appendChild(removeBtn);
        row.appendChild(actionCell);

        taskTableBody.appendChild(row);
    });
}

function removeTask(index, taskTableBody) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(taskTableBody);
}

// Handle add task form submission
function handleAddTask(event) {
    event.preventDefault();
    const taskNameInput = document.querySelector('#task-name');
    const taskDueInput = document.querySelector('#task-due');
    const taskPrioritySelect = document.querySelector('#task-priority');

    const taskName = taskNameInput.value.trim();
    const dueDate = taskDueInput.value;
    const priority = taskPrioritySelect.value;

    // Regex for task name: whatever
    const nameRegex = /^[A-Za-z ]*[A-Za-z][A-Za-z ]*$/;
    if (!nameRegex.test(taskName)) {
        alert('Task name must be at least acceptable.');
        return;
    }

    if (!dueDate) {
        alert('Please select a due date.');
        return;
    }

    // If valid, add to tasks array and localStorage
    tasks.push({ name: taskName, due: dueDate, priority: priority });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    alert('Task added successfully!');
    event.target.reset();
}

// Handle theme form on about.html
function handleThemeForm(event) {
    event.preventDefault();
    const themeSelect = document.querySelector('#theme-select');
    const chosenTheme = themeSelect.value;
    currentTheme = chosenTheme;
    localStorage.setItem('theme', chosenTheme);
    applyTheme(chosenTheme);
    alert('Theme updated!');
}

function applyTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.add('light-theme');
    }
}

