// random color for header (colt steel color randomizer code)
function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`
}

const letters = document.querySelectorAll('.letter');
const intervalId = setInterval(function () {
for (let letter of letters) {
  letter.style.color = randomRGB();
}
}, 2000);



//Code for the meme
//
let form = document.querySelector('#Maker');
let topText = document.querySelector('input[name="toptext"]');
let bottomText = document.querySelector('input[name="bottomtext"]');
let topColor = document.querySelector('input[name="topcolor"]');
let bottomColor = document.querySelector('input[name="bottomcolor"]');
let topSize = document.querySelector('input[name="topsize"]');
let bottomSize = document.querySelector('input[name="bottomsize"]');
let results = document.querySelector('#results');
let mainList = document.querySelector('#more');

form.addEventListener('submit', function(e){
   e.preventDefault();

  //create an li
  let newList = document.createElement('li');
//create button
  let removeBtn = document.createElement('button');
  removeBtn.innerText = 'x';
  
  
  let topLogo = logo(
    topText.value,
    topColor.value,
    topSize.value
    );

    let botLogo = logo(
        bottomText.value,
        bottomColor.value,
        bottomSize.value
        );

   let imgLogo = img();
   imgLogo.width = "350"; 


   removeBtn.setAttribute("id","rid");
   newList.setAttribute("id","newList");
   botLogo.setAttribute("id","botty");
   topLogo.setAttribute("id","toppy");
   botLogo.style.fontFamily = "Impact";
   topLogo.style.fontFamily = "Impact";

newList.appendChild(removeBtn);  //button
newList.appendChild(imgLogo);    //image
newList.appendChild(topLogo);   //top text
newList.appendChild(botLogo);  // bottom text
mainList.appendChild(newList); //list is placed in unordered list
document.forms['Maker'].reset()
});

mainList.addEventListener('click', function(e){
    if(e.target.tagName === 'BUTTON'){
      e.target.parentElement.remove();
    }
});

function logo(text, color, size){
let logo = document.createElement('h2');
logo.innerText = text;
logo.style.color = color;
logo.style.fontSize = size + 'px';
return logo;
}


function img (){
let image = new Image();
image.src = document.querySelector('input[name="url"]').value;
return image;
}

