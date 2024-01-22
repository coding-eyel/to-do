function init() {
  let addBtn = document.getElementById("add-list");
  let allTasksBtn = document.getElementById("all-tasks");
  let tasksContainer = document.querySelector("#tasks-container");
  let taskLibrary = [];
  let listLibrary = [];
  let currentList = null;

  function generateDisplay() {
    currentList = "All Tasks";
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
  }
  generateDisplay();

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
          let result = confirm("Deleting the list will make all tasks in the list appear only in the All Tasks tab. Continue?")

          if (result) {
            this.parentElement.remove();
            allTasksBtn.click();
          }
        })
      })

      listModal.style.display = "none";
      form.reset();
    } else {
      alert("Please enter a valid List name");
    }
    clickList();
  }

  function generateTaskHtml({ dataAttribute, task }) {

    return `
      <div class="new-task" data-id="${dataAttribute}" data-list="${currentList}" data-star="no">
      <div class="task-display">
        <div class="task-details">
          <div class="genTask">
            <input type="checkbox" class="task-checkbox">
            <div class="task-title-box">${task.title}</div>
            <div class="task-duedate-box">
              <span class="task-duedate">${task.date}</span>
            </div>
            <div class="task-buttons">
              <button class="task-star-box">
              <svg class="task-star"  width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </button> 
              <button class="task-expand-box">
              <svg class="task-expand" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 12L12 18L6 12" stroke="#33363F" stroke-width="2.5"/>
                <path d="M18 6L12 12L6 6" stroke="#33363F" stroke-width="2.5"/>
              </svg>
              </button> 
              <button class="task-edit-box">
              <svg class="task-edit" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M4 16.0001V20.0001L8 20.0001L18.8686 9.13146L18.8695 9.13061C19.265 8.73516 19.4628 8.53736 19.5369 8.3092C19.6021 8.10835 19.6022 7.89201 19.5369 7.69117C19.4627 7.46284 19.2646 7.26474 18.8686 6.86872L17.1288 5.12892C16.7345 4.7346 16.5369 4.53704 16.3091 4.46301C16.1082 4.39775 15.8919 4.39775 15.691 4.46301C15.463 4.53709 15.2652 4.73488 14.8704 5.12976L14.8686 5.13146L4 16.0001Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </button> 
              <button class="task-delete-box">
              <svg class="task-delete" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>
              </svg>
              </button> 
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

  function createNewTask() {
    let addTaskBtn = document.querySelector(".add-task");
    let newTaskModal = document.getElementById("newTaskModal");
    let taskForm = document.querySelector("#modal-form");
    let taskTitle = document.querySelector("#todo-title");
    let taskDescription = document.querySelector("#todo-description");
    let taskDate = document.querySelector("#todo-date");
    let listTitleText = document.querySelector(".list-title-text");

    function createTaskObj(title, description, date) {
      return { title, description, date }
    }

    addTaskBtn.onclick = function () {
      let titleValue = taskTitle.value.trim();
      let descriptionValue = taskDescription.value.trim();
      let dateValue = taskDate.value.trim();

      if (titleValue !== '' && descriptionValue !== '' && dateValue !== '') {
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
        clickCheckbox();
        taskForm.reset();
      } else {
        alert("Please fill out the fields");
      }
    };
  };
  createNewTask();

  function clickList() {
    let listTitles = document.querySelectorAll(".newList");
    let titleText = document.querySelector(".list-title-text");
    let newTasks = document.querySelectorAll(".new-task");

    allTasksBtn.onclick = function () {
      currentList = "All Tasks";
      titleText.textContent = "All Tasks";

      if (currentList === "All Tasks") {
        newTasks.forEach(task => {
          task.style.display = "block";
        })
      }
    };

    listTitles.forEach((list) => {
      list.addEventListener("click", function () {
        currentList = list.textContent;
        titleText.textContent = currentList;
        console.log(currentList)

        newTasks.forEach((task) => {
          let listName = task.getAttribute("data-list");
          if (listName === currentList || currentList === "All Tasks") {
            task.style.display = "block";
          } else {
            task.style.display = "none";
          }
        });
      });
    });
  }
  clickList();

  function clickTaskBtns() {
    let taskExpand = document.querySelectorAll(".task-expand");
    let taskDelete = document.querySelectorAll(".task-delete");
    let taskStar = document.querySelectorAll(".task-star");
    let taskDetails = document.querySelectorAll(".task-details");
    let taskEdit = document.querySelectorAll(".task-edit");

    taskStar.forEach(star => {
      star.addEventListener('click', function () {
        let newTask = this.closest(".new-task");
        let dataStar = newTask.getAttribute("data-star");

        if (dataStar === "no") {
          newTask.setAttribute("data-star", "yes");
          star.classList.add("task-star-filled");
        } else if (dataStar === "yes") {
          newTask.setAttribute("data-star", "no");
          star.classList.remove("task-star-filled");
        }
      })
    })

    taskExpand.forEach(expanded => {
      expanded.addEventListener('click', function () {
        let taskDisplay = this.closest(".task-display");

        if (taskDisplay) {
          taskDisplay.classList.toggle("task-display-extended");
          expanded.classList.toggle("task-expand-rotated");
        }
      });
    });

    taskEdit.forEach(edited => {
      edited.addEventListener('click', function () {
        let editModal = document.querySelector("#edit-modal");
        let closeEditModal = document.querySelector(".close-edit-modal");
        let editTitle = document.querySelector("#edit-title");
        let editDescription = document.querySelector("#edit-description");
        let editDate = document.querySelector("#edit-date");
        let saveTask = document.querySelector(".save-task");

        let taskDisplay = this.closest(".task-display");

        if (taskDisplay) {
          let taskTitle = taskDisplay.querySelector(".task-title-box");
          let dueDate = taskDisplay.querySelector(".task-duedate");
          let taskDescription = taskDisplay.querySelector(".description-display");

          editModal.style.display = "block";
          closeEditModal.onclick = () => editModal.style.display = "none";

          editTitle.value = taskTitle.innerText;
          editDescription.value = taskDescription.innerText;
          editDate.value = dueDate.innerText;

          saveTask.onclick = () => {
            taskTitle.textContent = editTitle.value;
            taskDescription.textContent = editDescription.value;
            dueDate.textContent = editDate.value;

            editModal.style.display = "none";
          }
        }

      })
    })

    taskDelete.forEach(deleted => {
      deleted.addEventListener("click", function () {
        let newTask = this.closest(".new-task");
        let dataIndex = newTask.getAttribute("data-id");

        taskLibrary.splice(dataIndex, 1);
        console.log(taskLibrary);

        newTask.remove();
        console.log(taskLibrary);
      })
    })
  }

  function clickMainLists() {
    let todayTasksBtn = document.querySelector("#today-tasks");
    let starredTasksBtn = document.querySelector("#starred-tasks");
    let titleText = document.querySelector(".list-title-text");

    starredTasksBtn.onclick = function () {
      let newTasks = document.querySelectorAll(".new-task");

      titleText.textContent = "Starred";

      newTasks.forEach(task => {
        let dataStar = task.getAttribute("data-star");

        if (dataStar === "yes") {
          task.style.display = "block";
        } else if (dataStar === "no") {
          task.style.display = "none";
        }
      });
    };

    todayTasksBtn.onclick = function () {
      let newTasks = document.querySelectorAll(".new-task");
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

      console.log(String(currentDate));

      newTasks.forEach(task => {
        let taskDate = task.querySelector(".task-duedate").textContent;

        console.log(taskDate)

        if (taskDate === currentDate) {
          task.style.display = "block";
        } else {
          task.style.display = "none";
        }
      })
    }
  }
  clickMainLists();




  function clickCheckbox() {
    let checkboxes = document.querySelectorAll(".task-checkbox");
    let taskTitles = document.querySelectorAll(".task-title-box");

    checkboxes.forEach((checkbox, index) => {
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          taskTitles[index].classList.add("task-title-box-checked");
        } else {
          taskTitles[index].classList.remove("task-title-box-checked");
        }
      });
    });
  }
}
init()