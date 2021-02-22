// tested below with sample array
let arr = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];

function turnToNums(string){
  let final = [];
  //turn the string in query to numbers
  for (let i = 0; i < string.length; i++) {
      let num = Number(string[i]); 
        // console.log(isNaN(num), num);
      if (isNaN(num)) {
          return Error(
            `Value ${string[i]} at the index ${i} is not a number.`
          );
      }
      final.push(num);
  }
  return final;
}


function freqCount(arr) {
// key = num,  value = frequency
  let count = {} 

  for(let i = 0; i < arr.length; i++){
    if (count[arr[i]]){
        count[arr[i]] += 1;
  } else {
         count[arr[i]] = 1;
  }
  // short hand method below
  //count[arr[i]] = count[arr[i]] ? count[arr[i]] + 1 : 1;
    }
  return count;
}


function getMode(arr) {
if (arr.length === 0) {
   return "No numbers were passed in";  
} else {
  let count = 0;
  let md;
  let frequnecy = freqCount(arr);
  for(let key in frequnecy){
      if(frequnecy[key] > count) {
         md = key
         count = frequnecy[key]
      }
    }
   md = parseInt(md);
// +md = parseInt(md)
   return md;
}}


function getMedian(arr) {
if (arr.length === 0) {
  return 0;  
} else {
arr.sort();
let median;
// integers; no decimal places.
let middle = Math.floor(arr.length / 2);

  if (arr.length % 2 === 0) {
    // if there is no middle number add and divide two middle nums
        median = (arr[middle] + arr[middle - 1]) / 2;
       } else {
        median = arr[middle];
       }
      return median;
}}


function getMean(arr) {
let mean;
let total = 0;
if(arr.length === 0) {
  return 0;
} else {
// do not use for/in, use for/of
for (let num of arr) {
    total = total + num;
    }
   mean = total / arr.length;
  return mean;
}}


// export all functions as modules
module.exports = {
    turnToNums,
    freqCount,
    getMode,
    getMedian,
    getMean
};