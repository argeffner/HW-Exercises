
let baseURL = "http://numbersapi.com";
// need to make a favorite number
let myFav = 13;
// easier to use jQuery to get json 
//http://numbersapi.com/random/year?json is an example of getting json api
// P1.1
  $.getJSON(`${baseURL}/${myFav}?json`)
   .then(Data => {
    console.log(Data)
  })

//P1.2
let Favs = [3,13,57]

  $.getJSON(`${baseURL}/${Favs}?json`)
   .then(Data => {
    console.log(Data)
  })

// P1.3
let fourFacts = [];
for (let i = 1; i < 5; i++) {
  fourFacts.push(
    $.getJSON(`${baseURL}/${myFav}?json`)
  );
}
Promise.all(fourFacts)
.then(facts => { 
//use forEach(data => something) to add data to html body in ul
facts.forEach(data => $("#list").append(`<li>${data.text}</li>`));
});

// Other way of doing it
/*
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favNumber}?json`);
  })
).then(facts => {
  facts.forEach(data => $("#list").append(`<li>${data.text}</li>`));
});

*/