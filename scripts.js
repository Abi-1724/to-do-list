let totalTasks = 0;
let completedTasks = 0;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const taskDate = document.getElementById('taskDate').value;

    if (taskText === '' || taskDate === '') {
        alert('Please enter both task and due date.');
        return;
    }

    totalTasks++;
    updateProgress();

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');

    const taskContent = document.createElement('span');
    taskContent.textContent = `${taskText} (Due: ${taskDate})`;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.onclick = function () {
        if (!li.classList.contains('completed')) {
            li.classList.add('completed');
            completedTasks++;
            updateProgress();
        }
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.onclick = function () {
        taskList.removeChild(li);
        if (li.classList.contains('completed')) {
            completedTasks--;
        }
        totalTasks--;
        updateProgress();
    };

    // Append buttons to the button container
    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(deleteButton);

    // Append task content and button container to the list item
    li.appendChild(taskContent);
    li.appendChild(buttonContainer);

    // Append the list item to the task list
    taskList.appendChild(li);

    // Clear input fields
    taskInput.value = '';
    document.getElementById('taskDate').value = ''; // Reset date input
}

function updateProgress() {
    document.getElementById('completedCount').textContent = completedTasks;
    document.getElementById('totalTasks').textContent = totalTasks;
}
