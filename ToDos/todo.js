
let form = document.querySelector('#todo');
let input = document.querySelector('#listitem');
let mainList = document.querySelector('#theList')

mainList.addEventListener('click', function(e){
  if(e.target.tagName === 'BUTTON'){
    e.target.parentElement.remove();
  }
  else if(e.target.tagName === 'LI'){
    e.target.style.textDecoration == "line-through" ? e.target.style.textDecoration = "none": e.target.style.textDecoration = "line-through";  }
});

form.addEventListener('submit', function(e){
  e.preventDefault();

  let newList = document.createElement('li');

  let removeBtn = document.createElement('button');
  removeBtn.innerText = 'x';
  

  newList.innerText = input.value;
  newList.appendChild(removeBtn);
  input.value = '';
  mainList.appendChild(newList);
})