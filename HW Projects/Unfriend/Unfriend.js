// the commented coded lines are the older and less effient version of the code

// let removeButtons = document.querySelectorAll('li button');
let form = document.querySelector('#add-friend');
let input = document.querySelector('#first-name');
let friendList = document.querySelector('#friends')

// for (let btn of removeButtons){
//   btn.addEventListener('click', function(e){
//     e.target.parentElement.remove();
//   })
// }

friends.addEventListener('click', function(e){
  if(e.target.tagName === 'BUTTON'){
    e.target.parentElement.remove();
  }
  else if(e.target.tagName === 'LI'){
    e.target.classList.add('best-friend');
    let heart = document.createElement('span');
    heart.innerHTML = '&hearts;';
    e.target.prepend(heart);
  }
});

form.addEventListener('submit', function(e){
  e.preventDefault();
  console.log(input.value)
  let newFriend = document.createElement('li');
  let removeBtn = document.createElement('button');
  removeBtn.innerText = 'Unfriend';
  // removeBtn.addEventListener('click', function(e){
  //   e.target.parentElement.remove();
  // })
  newFriend.innerText = input.value;
  newFriend.appendChild(removeBtn);
  input.value = '';
  friendList.appendChild(newFriend);
})