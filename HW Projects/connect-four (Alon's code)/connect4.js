/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let y = 0;  y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  } // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const board = document.querySelector("#board") // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  /** The code below makes it so that when you click on a column it goes to the bottom */
  // TODO: add comment for this code
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  /** This code allows you to pile the count on a colunm so that it doesn't stop at the bottom column */
  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

//Deleting all elements to reset game
function deleteTime() { 
  let e = document.querySelectorAll("td");  
  let child = e.lastElementChild;  
        while (child) { 
          first.remove(); 
          first = e.firstElementChild; 
  } 
} //code is not working and not sure why

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0
    // Height is the total 7 spaces so I need to fill up the bottom 6 = Height-1
    for (let y = HEIGHT-1; y >= 0; y--) {
      if(!board[y][x]){
        return y;
      }
    }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`); //need to alternate between 1 and 2
  piece.style.top = -50 * (y + 2);

  const space = document.getElementById(`${y}-${x}`)
  space.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  setTimeout(function () {
    alert(msg);
},1000);
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    if(currPlayer === 1){
    //return endGame(`Player ${currPlayer} won!`);
    return endGame(`You're an idiot Morty`);
  }else{
    return endGame(`Shut up Morty`)
  } 
}

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame("uuhhhhh")
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  /*  currPlayer = function() {
        if (currPlayer === 1) {
              currPlayer = 2;
            } else { 
               currPlayer = 1;
          } 
       return currPlayer;
     } 
     */
  // Shorthand version of function above
  currPlayer = (currPlayer === 1) ? 2 : 1; 
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }

}
let btn = document.getElementById("btn").onclick = function() { 
  deleteTime(); 
  location.reload(); // using the reload instead of the emptying using deleteTime
} 
makeBoard();
makeHtmlBoard();
