let todoList = [];

// Save todoList to chrome storage
function saveTasks() {
    chrome.storage.sync.set({ todoList: todoList });
}

// Load tasks from chrome storage
function loadTasks() {
    chrome.storage.sync.get('todoList', function(data) {
        if (data.todoList) {
            todoList = data.todoList;
            updateList();
        }
    });
}

// Delete tasks from chrome storage
function deleteTask(index) {
    todoList.splice(index, 1); // Remove the task at this index
    saveTasks(); // Save the updated task list
    updateList(); // Refresh the task list display
}


function addTask() {
    let taskText = document.getElementById('taskText');
    let taskSchedule = document.getElementById('taskSchedule');


    todoList.push({ text: taskText.value, schedule: taskSchedule.value, completed: false });

    // Clear the input fields
    taskText.value = '';
    taskSchedule.value = '';

    saveTasks(); // Save the tasks after adding a new one
    updateList();
}

function toggleComplete(index) {
    todoList[index].completed = !todoList[index].completed;
    saveTasks(); // Save the tasks after toggling completion
    updateList();
}

function updateList() {
    let listDiv = document.getElementById('todoList');
    listDiv.innerHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        let taskDiv = document.createElement('div');

        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = todoList[i].completed;
        checkBox.onchange = function() { toggleComplete(i); };
        taskDiv.appendChild(checkBox);

        let taskText = document.createElement('span');

let todoText = document.createElement('span');
todoText.innerHTML = todoList[i].text;
todoText.className = 'textStyle'; // Apply textStyle class

let scheduleText = document.createElement('span');
scheduleText.innerHTML = '- ' + todoList[i].schedule;
scheduleText.className = 'scheduleStyle'; // Apply scheduleStyle class

taskText.appendChild(todoText);
taskText.appendChild(document.createElement('br')); // Adding a line break
taskText.appendChild(scheduleText);


if (todoList[i].completed) {
    taskText.className += ' completed'; // Append the completed class if the task is completed
}

        
        // Create a delete icon
        let deleteIcon = document.createElement('span');
        deleteIcon.innerHTML = '&#x2716;'; // This is the Unicode code for the "x" symbol
        deleteIcon.style.cursor = 'pointer';
        deleteIcon.style.color = '#78290f'; // This will make the icon red
        deleteIcon.style.marginLeft = '5px';
      
        deleteIcon.onclick = function() { deleteTask(i); };
        
        taskText.appendChild(deleteIcon);
        taskDiv.appendChild(taskText);
        listDiv.appendChild(taskDiv);
    }





}



document.addEventListener('DOMContentLoaded', function () {
    loadTasks(); // Load tasks when the document is loaded
    document.getElementById('addTaskButton').addEventListener('click', addTask);
});

document.getElementById('mode-toggler').addEventListener('click', function () {
    const sunIcon = document.getElementById('moon-icon');
    const moonIcon = document.getElementById('sun-icon');
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'inline-block';
    } else {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'inline-block';
    }
  });
  