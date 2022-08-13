export const removeTask = (elem, id) => {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  elem.parentElement.remove();
  tasks.splice(id, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const removeTaskAddEvents = (elem, id) => {
  elem.dataset.taskId = id;
  elem.addEventListener('click', () => {
    removeTask(elem, id);
    window.location.reload();
  });
};