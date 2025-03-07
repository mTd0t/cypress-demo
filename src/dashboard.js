// Check if the user is logged in
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html'; // Redirect to login if not authenticated
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Task management
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span id="task-${index}">${task}</span>
            <div>
                <button class="btn btn-warning btn-sm me-2" onclick="editTask(${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Add a new task
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskInput.value = '';
    }
});

// Delete a task
window.deleteTask = function(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
};

// Edit a task
window.editTask = function(index) {
    const taskElement = document.getElementById(`task-${index}`);
    const currentTaskText = tasks[index];

    // Replace the task text with an input field
    taskElement.innerHTML = `
        <input type="text" id="editInput-${index}" class="form-control" value="${currentTaskText}">
        <button class="btn btn-success btn-sm mt-2" onclick="saveTask(${index})">
            <i class="fas fa-save"></i> Save
        </button>
    `;
};

// Save the edited task
window.saveTask = function(index) {
    const editedTaskText = document.getElementById(`editInput-${index}`).value.trim();
    if (editedTaskText) {
        tasks[index] = editedTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    } else {
        alert('Task cannot be empty!');
    }
};

// Initial render
renderTasks();