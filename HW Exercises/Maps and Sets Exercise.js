// 1) What does the flollowing return?
new Set([1,1,2,2,3,4])

//a new set with object {1,2,3,4}
{1,2,3,4}



// 2) What does the flollowing return?
let comkey = [...new Set("referee")].join("")

// it returns a set of the characters 'r', 'e', 'f', and since the rest are repeated they are not added. Then the .join("") joins the strings into one string giving an output of 'ref'. 
 "ref"


// 3) What does the Map m look like after running the code?

let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);

 m = {[1,2,3]: true, [1,2,3]: false} // not sure if the : is replaced by =>

 /*
m = 0: {Array(3) => true} 
     1: {Array(3) => false}
*/

// 4) Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a dulicate.

function hasDuplicate(arr){
let mySet = new Set(arr);
    if(mySet.size === arr.length) {
        return  false; // doesn't have duplicate 
    } else {
            return true; // has duplicate 
        }
}

//shorter arrow fucntion version

let hasDup = arr => new Set(arr).size !== arr.length; 
//SB Version




// 5) Write a function called vowel count which takes a string and returns a map with keys as the vowels and values the number count of vowels in a string.

function vowelCount(str){
    let vowels = "aeiou";
    let word = str.toLowerCase();
    let myMap = new Map(); // new empty Map.
    for (char of word) {  
        if (vowels.includes(char)) {  // checks to see if char in the word is a vowel.
            if(!(myMap.has(char))) {  //checks if the char/vowel is not yet already in myMap.
                myMap.set(char, 1); // if not set char to 1.
            } else { 
                myMap.set(char,myMap.get(char) + 1) // if so add number count to that char.
            }
           // console.log(myMap) // testing to see if it is adding the characters.
         }
            
    }
    return myMap;
}
