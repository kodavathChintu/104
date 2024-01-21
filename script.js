document.addEventListener('DOMContentLoaded', function () {
  loadTasks();
});

function addTask() {
  var taskInput = document.getElementById('new-task');
  var taskText = taskInput.value.trim();

  if (taskText !== '') {
      var taskList = document.getElementById('task-list');
      var newTask = document.createElement('li');
      newTask.innerHTML = `
          <span>${taskText}</span>
          <div>
              <button onclick="editTask(this)">Edit</button>
              <button onclick="deleteTask(this)">Delete</button>
              <input type="checkbox" onchange="toggleTaskStatus(this)">
          </div>
      `;
      taskList.appendChild(newTask);
      saveTasks();
      taskInput.value = '';
  }
}

function editTask(button) {
  var taskText = button.parentElement.previousElementSibling;
  var newText = prompt('Edit task:', taskText.innerText.trim());

  if (newText !== null) {
      taskText.innerText = newText;
      saveTasks();
  }
}

function deleteTask(button) {
  var task = button.parentElement.parentElement;
  task.remove();
  saveTasks();
}

function toggleTaskStatus(checkbox) {
  var taskText = checkbox.parentElement.previousElementSibling;
  if (checkbox.checked) {
      taskText.classList.add('completed');
  } else {
      taskText.classList.remove('completed');
  }
  saveTasks();
}

function saveTasks() {
  var taskList = document.getElementById('task-list');
  localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
  var taskList = document.getElementById('task-list');
  taskList.innerHTML = localStorage.getItem('tasks') || '';
}
