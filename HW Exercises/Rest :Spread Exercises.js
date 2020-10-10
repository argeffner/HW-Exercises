// Original

function filterOutOdds() {
  var nums = Array.prototype.slice.call(arguments);
  return nums.filter(function(num) {
    return num % 2 === 0
  });
}
//Updated 

const filterOdds = (...nums) => nums.filter(n => n % 2 === 0)



// write function called findMin that accepts a vaiable numbe of arguments and returns the smallest argument. (Use spread and rest operator)


const finMin = (...nums) => Math.min(...nums);


// Write a function called merObjects  that takes two objects and returns a new object with all the keys and values.
// Ex: mergeObjects({a:1, b:2}, {c:3, d:4}) // {a:1, b:2, c:3, d:4}

const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2});
// shorter version
const mergeObjects = {...obj1, ...obj2};


// write function that doubles the input arguments and places them in the existing array
// Ex: doubleAndReturnArgs([1,2,3],4,4) // [1,2,3,8,8]

let doubleAndReturnArgs = (arr,...nums) => [...arr, ...nums.map(n => n * 2)];



/** remove a random element in the items array
and return a new array without that item. */

let removeRandom = (items) => {
  let rand =  Math.floor(Math.random()*items.length);
  console.log("this removes the index", rand);
 return [...items.slice(0, rand), ...items.slice(rand+1)]; //removes evreything at rand  and after it,  removes everything after rand.
};

let removeRandom = (items) => {
  let rand =  Math.floor(Math.random()*items.length);
  console.log("this removes the index", rand);
 return [...items.splice(rand, 1)]; //removes evreything at rand  and after it,  removes everything after rand.
};



/** Return a new array with every item in array1 and array2. */

let extend = (array1, array2) => {
    return [...array1,...array2];
}




/** Return a new object with all the keys and values
from obj and a new key/value pair */

let addKeyVal = (obj, key, val) => {
   return ({...obj, [key]: val});
}




/** Return a new object with a key removed. */

let removeKey = (obj, key) => {
    let newObj = {...obj};
    delete newObj[key];
    return newObj;
}




/** Combine two objects and return a new object. */

let combine = (obj1, obj2) => {
   return ({...obj1, ...obj2});
}
//exactly the same answer as one of the previous quesions




/** Return a new object with a modified key and value. */

let update = (obj, key, val) => {
    return ({...obj, [key]: val});
}
// only works if object has the same exact key.

//other option they provided which may be more accurate
let update = (obj, key, val) => {
let newObj = { ...obj }
  newObj[key] = val;
  return newObj;
}
