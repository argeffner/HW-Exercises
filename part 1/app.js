// async method using class and constructors
class Numbers {
    constructor(num) {
        this.favNum = num;
        this.multiNum = [3,num,57]
        this.baseURL = "http://numbersapi.com"
    }

    async favNumber() {
        let url = `${this.baseURL}/${this.favNum}?json`;
        let response = await $.getJSON(url);
        console.log(response);
    }

    async multiNumbers() {
        let url = `${this.baseURL}/${this.multiNum}?json`;
        let response = await $.getJSON(url);
        console.log(response)
    }

    async fourFacts() {
        let facts = await Promise.all(
            Array.from({ length: 4 }, () => 
            $.getJSON(`${this.baseURL}/${this.favNum}?json`))
            );
            facts.forEach(data => 
            $("#list").append(`<li>${data.text}</li>`));
    }

}

let numbersApi = new Numbers(13);
// 1
numbersApi.favNumber();
// 2
numbersApi.multiNumbers();
// 3
numbersApi.fourFacts();


/*  Regular Async method

let favNumber = 5;
let baseURL = "http://numbersapi.com";

// 1.
async function part1() {
  let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
  console.log(data);
}
part1();

// 2.
const favNumbers = [7, 11, 22];
async function part2() {
  let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
  console.log(data);
}
part2();

// 3.
async function part3() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
  );
  facts.forEach(data => {
    $('body').append(`<p>${data.text}</p>`);
  });
}
part3();

*/