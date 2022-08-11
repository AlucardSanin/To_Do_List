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
    AddTask(toDo,boolean,counter) {
        this.#tasks.push({
        toDo,
        boolean,
        counter,
      });
    }

    DeleteTask(id) {
      const localTasks = this.#tasks;

      this.#tasks = localBooks.filter((tasks) => {
        if (tasks.id !== id) {
          return true;
        }
        return false;
      });
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
