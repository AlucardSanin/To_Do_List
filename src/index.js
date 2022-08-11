import './style.css';
import Tasks from '../modules/tasks.js';
const myTasks = new Tasks();
myTasks.LoadTaskFromLocal();

let counter = 1;

//HTML Management
const container = document.querySelector('.container');
container.innerHTML= `<div class="title">
<h1>Today's To Do</h1>
<span class="material-symbols-outlined"><a  href="">sync</a></span>
</div>`;
const list = document.createElement('ol');
list.classList.add('list');
const input = document.createElement('div');
input.classList.add('input');
const clear = document.createElement('div');
clear.innerHTML= `<p>Clear all completed</p>`;
clear.classList.add('clear');
container.appendChild(input);
container.appendChild(list);  
container.appendChild(clear);  

input.innerHTML=`
<input type="text" id="toDo" placeholder="Add to your list..." required>
<span class="material-symbols-outlined" id>
subdirectory_arrow_left
</span>`;

document.getElementById('toDo').addEventListener('keypress',(e) => {
let toDo = document.getElementById('toDo').value;
if (e.key === 'Enter' && toDo !=="") {
myTasks.AddTask(toDo,false,counter);
myTasks.SaveTaskLocal();
counter ++;
console.log('si');
render();
}
});

//View
const render = () => {
    document.querySelector('.list').innerHTML = '';
    if (myTasks.Tasks) {
      myTasks.Tasks.forEach((tasks) => {
        const element = document.createElement('li');
        element.innerHTML  = `<input type="checkbox">${tasks.toDo}`;
        element.classList.add('eachtask');       
        list.appendChild(element);  
        });

        }
    };
    render();
