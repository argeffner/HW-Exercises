let form = document.querySelector('#todo');
let input = document.querySelector('#listitem');
let mainList = document.querySelector('#theList')

// retrieve from localStorage
let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedTodos.length; i++) {
  let newList = document.createElement("li");
  newList.innerText = savedTodos[i].listitem;
  newList.isCompleted = savedTodos[i].isCompleted ? true : false;
  if (newList.isCompleted) {
    newList.style.textDecoration = "line-through";
  }
  mainList.appendChild(newList);
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  let newList = document.createElement("li");
  let inputValue = document.querySelector('#listitem').value;
  newList.innerText = inputValue;
  newList.isCompleted = false;
  form.reset();
  mainList.appendChild(newList);

  // save to localStorage
  savedTodos.push({ listitem: newList.innerText, isCompleted: false });
  localStorage.setItem("todos", JSON.stringify(savedTodos));
});

mainList.addEventListener("click", function(e) {
  let clickedListItem = e.target;

  if (!clickedListItem.isCompleted) {
    clickedListItem.style.textDecoration = "line-through";
    clickedListItem.isCompleted = true;
  } else {
    clickedListItem.style.textDecoration = "none";
    clickedListItem.isCompleted = false;
  }

  // breaks for duplicates - another option is to have dynamic IDs
  for (let i = 0; i < savedTodos.length; i++) {
    if (savedTodos[i].listitem === clickedListItem.innerText) {
      savedTodos[i].isCompleted = clickedListItem.isCompleted;
      localStorage.setItem("todos", JSON.stringify(savedTodos));
    }
  }
});