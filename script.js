let addBtn = document.getElementById("add-list");

function openCloseModal() {
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
openCloseModal();

function list(title) {
  return {title};
}

addBtn.onclick = function() {
  let newTitle = document.getElementById("list-title").value;
  let listContainer = document.querySelector(".list-container");
  let listModal = document.getElementById("list-modal");
  let form = document.getElementById("new-list-form");

  let newListLine = document.createElement("div");
  if (newTitle.trim() !== "") {
    newListLine.innerHTML = `
    <div class="newList">${newTitle}<button class="listDeleteBtn">&times;</button></div>
    `
    listContainer.appendChild(newListLine);

    let listDeleteBtns = document.querySelectorAll('.listDeleteBtn');
    listDeleteBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        this.parentElement.remove();
      })
    })

    listModal.style.display = "none";
    form.reset();
  }else {
    alert("Please enter a valid List name");
  }
}

