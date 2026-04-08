const formInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const countLabel = document.getElementById('count');
const clearCompleted = document.getElementById('clear-completed');

const storageKey = 'day2-todo-tasks';
let tasks = JSON.parse(localStorage.getItem(storageKey) || '[]');

function saveTasks() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function updateCount() {
  const count = tasks.length;
  countLabel.textContent = `${count} task${count === 1 ? '' : 's'}`;
}

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'No tasks yet. Add one to get started.';
    empty.style.padding = '1rem';
    empty.style.color = '#6b7280';
    taskList.appendChild(empty);
    updateCount();
    return;
  }

  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `task-item${task.completed ? ' completed' : ''}`;

    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const text = document.createElement('span');
    text.textContent = task.text;
    label.append(checkbox, text);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter((itemTask) => itemTask.id !== task.id);
      saveTasks();
      renderTasks();
    });

    item.append(label, deleteButton);
    taskList.appendChild(item);
  });

  updateCount();
}

function addTask() {
  const text = formInput.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now().toString(),
    text,
    completed: false,
  });

  formInput.value = '';
  saveTasks();
  renderTasks();
}

addTaskButton.addEventListener('click', addTask);
formInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

clearCompleted.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

renderTasks();
