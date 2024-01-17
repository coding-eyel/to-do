function init() {
  let addBtn = document.getElementById("add-list");
  let allTasksBtn = document.getElementById("all-tasks");
  let tasksContainer = document.querySelector("#tasks-container");
  let taskLibrary = [];
  let listLibrary = [];
  let currentList = null;

  function openCloseListModal() {
    let openListModal = document.getElementById("open-modal");
    let modal = document.getElementById("list-modal");
    let closeModal = document.getElementById("close-list-modal");

    openListModal.onclick = function () {
      modal.style.display = "block";
    }

    closeModal.onclick = function () {
      modal.style.display = "none";
    }
  }
  openCloseListModal();

  addBtn.onclick = function () {
    let newTitle = document.getElementById("list-title").value;
    let listContainer = document.querySelector(".list-container");
    let listModal = document.getElementById("list-modal");
    let form = document.getElementById("new-list-form");

    let newListLine = document.createElement("div");
    newListLine.classList.add("newListLine")
    if (newTitle.trim() !== "") {
      newListLine.innerHTML = `
        <button class="newList">${newTitle}</button>
        <button class="listDeleteBtn"><img src="images/delete.svg" alt=""></button>
        `
      listContainer.appendChild(newListLine);
      listLibrary.push(newTitle);
      console.log(listLibrary);

      let listDeleteBtns = document.querySelectorAll('.listDeleteBtn');
      listDeleteBtns.forEach(btn => {
        btn.addEventListener("click", function () {
          this.parentElement.remove();
          showAllTasks();
          allTasksBtn.click();
        })
      })

      listModal.style.display = "none";
      form.reset();
    } else {
      alert("Please enter a valid List name");
    }
    clickList();
  }

  function showAllTasks() {
    allTasksBtn.onclick = function () {
      tasksContainer.innerHTML = `
          <div class="tasks-content">
            <div class="titleBox">
              <div class="task-list-title">
                <div class="list-title-text">${currentList}</div>
              </div>
            </div>
            <div class="taskBox">
              <div class="new-tasks-container">
 
              </div>
              <button type="button" class="new-task-btn">+ Add Task</button>
            </div>
          </div>
        `;



      let newTaskBtn = document.querySelector(".new-task-btn");
      let closeTaskModal = document.querySelector(".close-task-modal");
      let newTaskModal = document.getElementById("newTaskModal");

      newTaskBtn.onclick = function () {
        newTaskModal.style.display = "block";
      };

      closeTaskModal.onclick = function () {
        newTaskModal.style.display = "none";
      };
    };
    allTasksBtn.click();
  };
  showAllTasks();

  function createNewTask() {
    let addTaskBtn = document.querySelector(".add-task");
    let newTaskModal = document.getElementById("newTaskModal");
    let taskTitle = document.querySelector("#todo-title");
    let taskDescription = document.querySelector("#todo-description");
    let taskDate = document.querySelector("#todo-date");
    let listTitleText = document.querySelector(".list-title-text");

    function createTaskObj(title, description, date) {
      return { title, description, date }
    }

    addTaskBtn.onclick = function () {
      let newTask = createTaskObj(taskTitle.value, taskDescription.value, taskDate.value);

      taskLibrary.push(newTask);
      console.log(taskLibrary);

      let newTaskContainer = document.querySelector(".new-tasks-container")
      let taskContainerCode = ``;

      for (let [index, task] of taskLibrary.entries()) {
        taskContainerCode = generateTaskHtml({ dataAttribute: index, task })
        newTask.listName = listTitleText.innerHTML;
      };
      newTaskContainer.innerHTML += taskContainerCode;
      newTaskModal.style.display = "none";
      clickList();
      clickTaskBtns();
    };
  };
  createNewTask();

  function clickList() {
    let listTitle = document.querySelectorAll(".newList");
    let titleText = document.querySelector(".list-title-text");
    let newTask = document.querySelectorAll(".new-task");

    listTitle.forEach((list) => {
      list.addEventListener("click", function () {
        currentList = list.textContent;
        titleText.textContent = currentList;

        newTask.forEach((task, index) => {
          let listName = task.getAttribute("data-list");
          if (listName === currentList) {
            task.style.display = "block";
          } else {
            task.style.display = "none";
          }
        });
      })
    })
  }
  clickList();

  function clickTaskBtns() {
    let taskExpand = document.querySelectorAll(".task-expand");
    let taskDelete = document.querySelectorAll(".task-delete");

    taskExpand.forEach(expanded => {
      expanded.addEventListener('click', function () {
        let taskDisplay = this.closest(".task-display");
        if (taskDisplay) {
          taskDisplay.classList.toggle("task-display-extended");
        }
      });
    });

    taskDelete.forEach(deleted => {
      deleted.addEventListener("click", function () {
        let newTask = this.closest(".new-task");
        let dataIndex = newTask.getAttribute(".data-id");

        taskLibrary.splice(dataIndex, 1);
        console.log(taskLibrary);

        newTask.remove();
        console.log(taskLibrary);
      })
    })
  }


  function generateTaskHtml({ dataAttribute, task }) {

    return `
      <div class="new-task" data-id="${dataAttribute}" data-list="${currentList}">
      <div class="task-display">
        <div class="task-details">
          <div class="genTask">
            <input type="checkbox" class="task-checkbox">
            <div class="task-title-box">${task.title}</div>
            <div class="task-duedate-box">
              <span>${task.date}</span>
            </div>
            <div class="task-buttons">
              <button class="task-star-box"><img class="task-star" src="images/star.svg" alt=""></button> 
              <button class="task-expand-box"><img class="task-expand" src="images/expand.svg" alt=""></button> 
              <button class="task-edit-box"><img class="task-edit" src="images/edit.svg" alt=""></button> 
              <button class="task-delete-box"><img class="task-delete" src="images/trash-xmark.svg" alt=""></button> 
            </div>
          </div>
            <div class="description-display">
              Description: ${task.description}
            </div>
        </div>
      </div>
    </div>
    `
  }


}
init()
