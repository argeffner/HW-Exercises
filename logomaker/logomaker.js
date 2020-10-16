let form = document.querySelector('#logoform');
let brandInput = document.querySelector('input[name="brandname"]');
let colorInput = document.querySelector('input[name="color"]');
let fontsizeInput = document.querySelector('input[name="fontsize"]');
let results = document.querySelector('#results');

form.addEventListener('submit', function(e){
  e.preventDefault();
  let newLogo = logoMaker(
    brandInput.value,
    colorInput.value,
    fontsizeInput.value
    );
results.appendChild(newLogo);
});

function logoMaker(text, color, size){
let logo = document.createElement('h2');
logo.innerText = text;
logo.style.color = color;
logo.style.fontSize = size + 'px';
return logo;
}

