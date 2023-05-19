// Recupera as tarefas salvas do armazenamento local e converte para um array
const savedTasks = localStorage.getItem('tasks');
const tasks = savedTasks ? JSON.parse(savedTasks) : [];

const taskList = document.getElementById('task-list');

function renderTasks() {
  // Limpa a lista de tarefas existente
  taskList.innerHTML = '';

  // Renderiza cada tarefa na lista
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed || false;
    checkbox.addEventListener('change', () => {
      toggleTaskCompletion(index);
    });

    const taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', () => {
      deleteTask(index);
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });
}

function addTask(text) {
  const newTask = {
    text,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Adiciona evento de clique ao botão "Adicionar"
const addTaskBtn = document.getElementById('add-task-btn');
addTaskBtn.addEventListener('click', () => {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
  }
});

// Renderiza as tarefas iniciais ao carregar a página
renderTasks();
