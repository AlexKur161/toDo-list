const inp = document.getElementById("inp");
const showWrap = document.querySelector(".task-wraper");
const btnShow = document.querySelector(".btn-inp");

let tasks;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))
const rendering = (task,index) =>{
    return `
    <div class="task">
            <p class="task-title">${task.description}</p>
            <div class="wrap-inpbtn">
            <input class="check" type="checkbox">
            <button class="btn-inp"><img class="img-btn" src="img/close.svg" alt="search"></button>
            </div>
          </div>
    `
}
const addingTask = () =>{
    showWrap.innerHTML = "";
    if(tasks.length > 0){
        tasks.forEach((item,index) => {
            showWrap.innerHTML += rendering(item,index)
        });
        
    }
}
addingTask();
const updateLocal = () =>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
function Task(newTask){
    this.description = newTask;
    this.completed = false
}
btnShow.addEventListener('click',()=> {
    tasks.push(new Task(inp.value));
    updateLocal();
    addingTask();
    inp.value = '';
})