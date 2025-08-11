document.getElementById("addBtn").addEventListener("click", addTask);
document.getElementById("clearAllBtn").addEventListener("click", clearAllTasks);
let taskList = document.getElementById("taskList");
let taskCount = document.getElementById("taskCount");

// Load saved tasks from localStorage
window.onload = function() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        taskList.innerHTML = savedTasks;
        updateTaskCount();
    }
};

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
    updateTaskCount();
}

// Add a new task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskValue}</span>
        <div class="task-buttons">
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
}

// Mark as completed
function toggleComplete(taskSpan) {
    taskSpan.parentElement.classList.toggle("completed");
    saveTasks();
}

// Edit task
function editTask(button) {
    let taskSpan = button.parentElement.previousElementSibling;
    let newTask = prompt("Edit your task:", taskSpan.textContent);
    if (newTask && newTask.trim() !== "") {
        taskSpan.textContent = newTask.trim();
        saveTasks();
    }
}

// Delete a task
function deleteTask(button) {
    button.parentElement.parentElement.remove();
    saveTasks();
}

// Clear all tasks
function clearAllTasks() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        taskList.innerHTML = "";
        saveTasks();
    }
}

// Update task count
function updateTaskCount() {
    let count = taskList.querySelectorAll("li").length;
    taskCount.textContent = `${count} Task${count !== 1 ? 's' : ''}`;
}
