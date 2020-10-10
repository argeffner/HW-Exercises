// 1) Original Function
function double(arr) {
  return arr.map(function(val) {
    return val * 2;
  });
}

// 1) Shorthand 
 const double = arr => arr.map((val) => val *2);


 // 2) Original function
 function squareAndFindEvens(numbers){
    var squares = numbers.map(function(num){
      return num ** 2;
    });
    var evens = squares.filter(function(square){
      return square % 2 === 0;
    });
    return evens;
  }

// 2) Shorthand 
const squareAndFindEvens = numbers => numbers.map(num => num ** 2).filter(square => square % 2 === 0);
