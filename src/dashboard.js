// Check if the user is logged in
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html'; // Redirect to login if not authenticated
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Task management
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const activeTaskList = document.getElementById('activeTaskList');
const finishedTaskList = document.getElementById('finishedTaskList');

// Load tasks for the current user
let tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser.username}`)) || [];

// Render tasks
function renderTasks() {
    activeTaskList.innerHTML = '';
    finishedTaskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center mb-2 p-3 bg-white rounded-lg shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105';
        li.setAttribute('data-index', index); // Add a data attribute to uniquely identify the task

        if (task.completed) {
            // Render finished tasks
            li.innerHTML = `
                <span class="line-through text-gray-500">${task.text}</span>
                <div>
                    <button class="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-all duration-200 ease-in-out transform hover:scale-110" onclick="deleteTask(${index})">
                        Delete
                    </button>
                </div>
            `;
            finishedTaskList.appendChild(li);
        } else {
            // Render active tasks
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2 transition-all duration-200 ease-in-out transform hover:scale-110" onclick="editTask(${index})">
                        Edit
                    </button>
                    <button class="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 mr-2 transition-all duration-200 ease-in-out transform hover:scale-110" onclick="markTaskDone(${index})">
                        Done
                    </button>
                    <button class="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-all duration-200 ease-in-out transform hover:scale-110" onclick="deleteTask(${index})">
                        Delete
                    </button>
                </div>
            `;
            activeTaskList.appendChild(li);
        }
    });
}

// Add a new task
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({text: taskText, completed: false}); // Add task with completed status
        localStorage.setItem(`tasks_${currentUser.username}`, JSON.stringify(tasks)); // Save tasks for the current user
        renderTasks();
        taskInput.value = '';
    }
});

// Delete a task
window.deleteTask = function (index) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this task!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // Add a fade-out animation before deleting
            const taskElement = document.querySelector(`li[data-index="${index}"]`);
            taskElement.classList.add('opacity-0', 'transition-all', 'duration-300', 'ease-in-out');

            setTimeout(() => {
                tasks.splice(index, 1);
                localStorage.setItem(`tasks_${currentUser.username}`, JSON.stringify(tasks)); // Update tasks for the current user
                renderTasks();
                Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
            }, 300); // Wait for the animation to finish
        }
    });
};

// Edit a task
window.editTask = function (index) {
    const taskElement = document.querySelector(`li[data-index="${index}"] span`);
    const currentTaskText = tasks[index].text;

    // Replace the task text with an input field
    taskElement.innerHTML = `
        <input type="text" id="editInput-${index}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" value="${currentTaskText}">
        <button class="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 mt-2 transition-all duration-200 ease-in-out transform hover:scale-110" onclick="saveTask(${index})">
            Save
        </button>
    `;
};

// Save the edited task
window.saveTask = function (index) {
    const editedTaskText = document.getElementById(`editInput-${index}`).value.trim();
    if (editedTaskText) {
        tasks[index].text = editedTaskText;
        localStorage.setItem(`tasks_${currentUser.username}`, JSON.stringify(tasks)); // Update tasks for the current user
        renderTasks();
    } else {
        Swal.fire('Error!', 'Task cannot be empty.', 'error');
    }
};

// Mark a task as done
window.markTaskDone = function (index) {
    // Add a slide-out animation before marking as done
    const taskElement = document.querySelector(`li[data-index="${index}"]`);
    taskElement.classList.add('opacity-0', 'translate-x-full', 'transition-all', 'duration-300', 'ease-in-out');

    setTimeout(() => {
        tasks[index].completed = true;
        localStorage.setItem(`tasks_${currentUser.username}`, JSON.stringify(tasks)); // Update tasks for the current user
        renderTasks();

        // Show a success pop-up
        Swal.fire({
            icon: 'success',
            title: 'Task Completed!',
            text: 'Great job! You’ve completed a task.',
            confirmButtonText: 'OK',
            timer: 2000, // Automatically close after 2 seconds
            timerProgressBar: true,
        });
    }, 300); // Wait for the animation to finish
};

// Initial render
renderTasks();