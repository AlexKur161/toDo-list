const inp = document.getElementById("inp");
const showWrap = document.querySelector(".task-wraper");
const btnShow = document.querySelector(".btn-inp");

let tasks;
let checkedBox;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));
const rendering = (task,index) =>{
    return `
    <div class="task ${task.completed ? 'checked' : ''}">
            <p class="task-title">${task.description}</p>
            <div class="wrap-inpbtn">
            <input onclick="completed(${index})" class="check" type="checkbox"${task.completed ? 'checked' : ''}>
            <button onclick="deleteTask(${index})"  class="btn-inp"><img class="img-btn" src="img/close.svg" alt="search"></button>
            </div>
          </div>
    `
}
const addingTask = () =>{
    showWrap.innerHTML = "";
    if(tasks.length > 0){
        tasks.forEach((item,index) => {
            showWrap.innerHTML += rendering(item,index);
        })
        checkedBox = document.querySelectorAll('.task');
    }
}
addingTask();
const updateLocal = () =>{
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function Task(newTask){
    this.description = newTask;
    this.completed = false;
}
const completed = (index) => {
tasks[index].completed = !tasks[index].completed;
if(tasks[index].completed){
checkedBox[index].classList.add('checked');
}
else if(!tasks[index].completed){
    checkedBox[index].classList.remove('checked');
}
updateLocal(); 
addingTask();
}
const deleteTask = (index) => {
    checkedBox[index].classList.add('showanimation');
    setTimeout(() => {
    tasks.splice(index,1);
    updateLocal(); 
    addingTask();
    },1000)
    
}
btnShow.addEventListener('click',()=> {
    tasks.push(new Task(inp.value));
    updateLocal();
    addingTask();
    inp.value = '';
})
inp.addEventListener('keydown',()=> {
    if(event.code == 'NumpadEnter'){
    tasks.push(new Task(inp.value));
    updateLocal();
    addingTask();
    inp.value = '';
    }
})