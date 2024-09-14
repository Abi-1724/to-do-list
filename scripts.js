/* Place your JavaScript in this file */


// Get DOM elements
const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const doLaterList = document.getElementById('doLaterList');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');

// Add event listener to the add task button
addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    // Check if both fields are filled
    if (taskText === '' || dueDate === '') {
        alert('Please fill in both the task and due date fields');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <span>${dueDate}</span>
        <button class="complete-btn">Complete</button>
        <button class="delete-btn">Delete</button>
    `;

    if (new Date(dueDate) > new Date()) {
        doLaterList.appendChild(taskItem);
    } else {
        taskList.appendChild(taskItem);
    }

    taskInput.value = '';
    dueDateInput.value = '';

    updateProgress();
}

function updateProgress() {
    const totalTasks = taskList.children.length + doLaterList.children.length;
    const completedTasks = document.querySelectorAll('.task-item.completed').length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
}

// Event delegation for complete and delete buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('complete-btn')) {
        e.target.parentElement.classList.toggle('completed');
        updateProgress();
    } else if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        updateProgress();
    }
});
