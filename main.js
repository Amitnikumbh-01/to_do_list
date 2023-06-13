var pendingTasks = [];
var completedTasks = [];

function addTask() {
  var taskInput = document.getElementById('task-input');
  var taskName = taskInput.value;
  taskInput.value = '';

  var task = {
    name: taskName,
    added: new Date(),
    completed: null
  };

  pendingTasks.push(task);
  updateLists();
}

function completeTask(index) {
  var task = pendingTasks[index];
  task.completed = new Date();
  completedTasks.push(task);
  pendingTasks.splice(index, 1);
  updateLists();
}

function deleteTask(index, list) {
  if (list === 'pending') {
    pendingTasks.splice(index, 1);
  } else if (list === 'completed') {
    completedTasks.splice(index, 1);
  }
  updateLists();
}

function updateLists() {
  var pendingTasksList = document.getElementById('pending-tasks');
  var completedTasksList = document.getElementById('completed-tasks');

  // Clear lists
  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  // Update pending tasks list
  for (var i = 0; i < pendingTasks.length; i++) {
    var task = pendingTasks[i];
    var listItem = document.createElement('li');
    listItem.innerHTML = task.name + ' (Added: ' + task.added.toLocaleString() + ')';
    var completeButton = document.createElement('button');
     completeButton.innerHTML  = 'Complete';
    completeButton.onclick = completeTask.bind(null, i);
    listItem.appendChild(completeButton);
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = deleteTask.bind(null, i, 'pending');
    listItem.appendChild(deleteButton);
    pendingTasksList.appendChild(listItem);
  }

  // Update completed tasks list
  for (var j = 0; j < completedTasks.length; j++) {
    var completedTask = completedTasks[j];
    var completedListItem = document.createElement('li');
    completedListItem.innerHTML = completedTask.name + ' (Added: ' + completedTask.added.toLocaleString() + ', Completed: ' + completedTask.completed.toLocaleString() + ')';
    completedListItem.classList.add('completed');
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = deleteTask.bind(null, j, 'completed');
    completedListItem.appendChild(deleteButton);
    completedTasksList.appendChild(completedListItem);
  }
}