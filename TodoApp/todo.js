let addBtn = document.getElementById("addBtn");
let taskInput = document.getElementById("taskInput");
let taskDate = document.getElementById("taskDate");
let taskList = document.getElementById("taskList");
let deleteAllBtn = document.getElementById("deleteAllBtn");

let tasks = [];

addBtn.addEventListener("click", function() {
    let taskText = taskInput.value.trim();
    let date = taskDate.value;

    if (taskText === "" || date === "") {
        alert("please enter task and date");
        return;
    }

    let exists = tasks.find(t => t.text === taskText);
    if (exists) {
        alert("task already exists!");
        return;
    }

    let taskObj = { text: taskText, date: date };
    tasks.push(taskObj);
    displayTasks();
    taskInput.value = "";
    taskDate.value = "";
});

function displayTasks() {
    taskList.innerHTML = "";
    if (tasks.length === 0) {
        deleteAllBtn.style.display = "none";
    } else {
        deleteAllBtn.style.display = "block";
    }

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <div class="task-text">${task.text} <small>(${task.date})</small></div>
            <div class="btns">
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>`;
        taskList.appendChild(li);
    });
}

function editTask(index) {
    let newTask = prompt("edit your task:", tasks[index].text);
    let newDate = prompt("edit date:", tasks[index].date);

    if (newTask === null || newDate === null) return;

    newTask = newTask.trim();
    if (newTask === "" || newDate === "") {
        alert("fields cannot be empty!");
        return;
    }

    let exists = tasks.find((t, i) => t.text === newTask && i !== index);
    if (exists) {
        alert("task already exists!");
        return;
    }

    tasks[index].text = newTask;
    tasks[index].date = newDate;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

deleteAllBtn.addEventListener("click", function() {
    if (tasks.length === 0) {
        alert("no tasks to delete!");
        return;
    }
    if (confirm("are you sure you want to delete all?")) {
        tasks = [];
        displayTasks();
    }
});
