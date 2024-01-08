let addBtn = document.getElementById("add-list");
let allTasksBtn = document.getElementById("all-tasks");
let tasksContainer = document.querySelector("#tasks-container");
let newTaskBtn = document.querySelectorAll(".new-task-btn");

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
    let listTitle = document.querySelectorAll(".newList")
    
    listTitle.forEach((list) => {
      list.addEventListener("click", function() {
        tasksContainer.innerHTML = `
        <div class="tasks-content">
          <div class="task-list-title">
            <div>${list.textContent}</div>
          </div>
          <div class="new-tasks-container">
            
          </div>
          <button type="button" class="new-task-btn">+ Add Task</button>
        </div>
        `   
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
          <div>${allTasksBtn.textContent}</div>
        </div>
        <div class="new-tasks-container">
          
        </div>
        <button type="button" class="new-task-btn">+ Add Task</button>
      </div>
    `   
  }
}
showAllTasks();

function openCloseTaskModal() {
  let newTaskModal = document.querySelector("#newTaskModal");

  newTaskBtn.forEach(btn => {
    btn.addEventListener("click", function() {
      newTaskModal.style.display = "block";
    })
  })
}
openCloseTaskModal();




