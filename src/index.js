import './style.css';
import Tasks from './modules/tasks.js';
import { removeTaskAddEvents } from './modules/remove.js';

const myTasks = new Tasks();
myTasks.LoadTaskFromLocal();
let index = 1;
// HTML Management
const container = document.querySelector('.container');
container.innerHTML = `<div class="title">
<h1>Today's To Do</h1>
<span class="material-symbols-outlined"><a  href="">sync</a></span>
</div>`;
const list = document.createElement('ol');
list.classList.add('list');
const input = document.createElement('div');
input.classList.add('input');
const clear = document.createElement('div');
clear.innerHTML = '<p>Clear all completed</p>';
clear.classList.add('clear');
container.appendChild(input);
container.appendChild(list);
container.appendChild(clear);
input.innerHTML = `
<input type="text" id="toDo" placeholder="Add to your list..." required>
<span class="material-symbols-outlined">
subdirectory_arrow_left
</span>`;

// View
const render = () => {
  document.querySelector('.list').innerHTML = '';
  if (myTasks.Tasks) {
    myTasks.Tasks.forEach((tasks) => {
      const element = document.createElement('li');
      element.innerHTML = `<input type="checkbox"  ${tasks.completed ? 'checked=true' : ''}><span class="text"contenteditable="true">${tasks.toDo}</span>`;
      const removeIcon = document.createElement('span');
      removeIcon.classList.add('material-symbols-outlined');
      removeIcon.classList.add('removeIcon');
      removeIcon.textContent = 'delete';
      element.appendChild(removeIcon);
      element.classList.add('eachtask');
      element.setAttribute('id', `task-item-${tasks.index}`);
      list.appendChild(element);
      element.querySelector('span').addEventListener('input', (e) => {
        tasks.toDo = e.target.textContent;
        myTasks.SaveTaskLocal();
      });
      element.querySelector('input[type=checkbox]').addEventListener('input', (e) => {
        tasks.completed = e.target.checked;
        myTasks.SaveTaskLocal();
      });
    });
  }
  const removeBtns = document.querySelectorAll('.removeIcon');
  removeBtns.forEach(removeTaskAddEvents);
  myTasks.SaveTaskLocal();
};
document.getElementById('toDo').addEventListener('keypress', (e) => {
  const toDo = document.getElementById('toDo').value;
  if (e.key === 'Enter' && toDo !== '') {
    myTasks.AddTask(toDo, false, index);
    const filed = document.getElementById('toDo');
    filed.value = '';
    index += 1;
    render();
  }
});

document.querySelector('.clear').addEventListener('click', (e) => {
  e.preventDefault();
  myTasks.getNotCompletedTask().forEach((task, index) => {
    task.index = index;
  });
  myTasks.SetTasks(myTasks.getNotCompletedTask());
  render();
});

if (myTasks.getCompletedTask().length > 0) {
  document.querySelector('.clear').style.backgroundColor = 'rgb(128, 224, 229)';
  document.querySelector('.clear p').style.color = 'white';
}
render();