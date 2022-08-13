export default class Tasks {
  #tasks;

  constructor() {
    this.#tasks = [];
  }

  // Setters
  SetTasks(tasks) {
    this.#tasks = tasks;
  }

  // Getter
  get Tasks() {
    return this.#tasks;
  }

  // Methods
  AddTask(toDo, completed, index) {
    this.#tasks.push({
      toDo,
      completed,
      index,
    });
  }

  getCompletedTask() {
    return this.#tasks.filter((task) => task.completed);
  }

  getNotCompletedTask() {
    return this.#tasks.filter((task) => !task.completed);
  }

  SaveTaskLocal() {
    localStorage.setItem('tasks', JSON.stringify(this.#tasks));
  }

  LoadTaskFromLocal() {
    const savedtask = JSON.parse(localStorage.getItem('tasks'));
    if (Array.isArray(savedtask)) {
      this.#tasks = savedtask;
      return true;
    }
    return false;
  }
}