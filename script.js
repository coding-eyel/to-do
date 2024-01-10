let addBtn = document.getElementById("add-list");
let allTasksBtn = document.getElementById("all-tasks");
let tasksContainer = document.querySelector("#tasks-container");

function openCloseListModal() {
  let openListModal = document.getElementById("open-modal");
  let modal = document.getElementById("list-modal");
  let closeModal = document.getElementById("close-list-modal");

  openListModal.onclick = function() {
    modal.style.display = "block";
  }

  closeModal.onclick = function() {
    modal.style.display = "none";
  }
}
openCloseListModal();

function list(title) {
  return {title};
}

addBtn.onclick = function() {
  let newTitle = document.getElementById("list-title").value;
  let listContainer = document.querySelector(".list-container");
  let listModal = document.getElementById("list-modal");
  let form = document.getElementById("new-list-form");
  const LISTS = [];

  let newListLine = document.createElement("div");
  newListLine.classList.add("newListLine")
  if (newTitle.trim() !== "") {
    newListLine.innerHTML = `
    <button class="newList">${newTitle}</button>
    <button class="listDeleteBtn"><img src="images/delete.svg" alt=""></button>
    `
    listContainer.appendChild(newListLine);
    LISTS.push(newTitle);

    let listDeleteBtns = document.querySelectorAll('.listDeleteBtn');
    listDeleteBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        this.parentElement.remove();
        showAllTasks();
        allTasksBtn.click();
      })
    })

    listModal.style.display = "none";
    form.reset();
  }else {
    alert("Please enter a valid List name");
  }

  function clickList() {
    let listTitle = document.querySelectorAll(".newList");
    let titleText = document.querySelector(".list-title-text");
    
    listTitle.forEach((list) => {
      list.addEventListener("click", function() {
        titleText.textContent = list.textContent;
      })
    })
  }
  clickList();
}

function showAllTasks() {
  allTasksBtn.onclick = function() {
    tasksContainer.innerHTML = `
      <div class="tasks-content">
        <div class="task-list-title">
          <div class="list-title-text">${allTasksBtn.textContent}</div>
        </div>
        <div class="new-tasks-container">
          <div class="task-display">
            
          </div>
        </div>
        <button type="button" class="new-task-btn">+ Add Task</button>
      </div>
    `;

    let newTaskBtn = document.querySelector(".new-task-btn");
    let closeTaskModal = document.querySelector(".close-task-modal");

    newTaskBtn.onclick = function() {
      let newTaskModal = document.getElementById("newTaskModal");

      newTaskModal.style.display = "block";
    };

    closeTaskModal.onclick = function() {
      newTaskModal.style.display = "none";
    }
  };
};
showAllTasks();


function createNewTask() {
  let addTaskBtn = document.querySelector(".add-task");
  let taskTitle = document.querySelector("#todo-title");
  let taskDescription = document.querySelector("#todo-description");
  let taskDate = document.querySelector("#todo-date");
  let taskLibrary = [];

  function createTaskObj(title, description, date) {
    return{title, description, date}
  }

  addTaskBtn.onclick = function() {
    let newTask = createTaskObj(taskTitle.value, taskDescription.value, taskDate.value);
    taskLibrary.push(newTask);
    console.log(taskLibrary);
  }
}
createNewTask();






