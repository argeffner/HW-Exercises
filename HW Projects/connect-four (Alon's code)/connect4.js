/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

function randBack(){
 
  let theImg = ["https://64.media.tumblr.com/3cc3d7431a42ce4b496f471432681f74/tumblr_nwr0qc8z3D1tc28zvo4_1280.png", 
                "https://wallpapercave.com/wp/wp1822725.png",
                "https://wallpapercave.com/wp/wp1822726.jpg",
                "https://wallpapercave.com/wp/wp1822748.jpg",
                "https://wallpapercave.com/wp/wp1822754.jpg",
                "https://wallpapercave.com/wp/wp1822783.jpg",
                "https://wallpapercave.com/wp/wp1822806.png",
                "https://wallpapercave.com/wp/wp1822807.jpg",
                "https://wallpapercave.com/wp/wp1822808.png",
                "https://wallpapercave.com/wp/wp1822809.jpg",
                "https://wallpapercave.com/wp/wp1822763.jpg",
	              "https://cdnb.artstation.com/p/assets/images/images/028/853/683/large/nicholas-cole-jordan-flgtz-rickmorty-panorama-watermarked.jpg?1595716690",
                "https://i.imgur.com/EMzXEH7.jpg",
                "https://64.media.tumblr.com/e2aa898df2f0e45f4d0a25745153d11a/tumblr_nwr0qc8z3D1tc28zvo2_1280.png",
                "https://64.media.tumblr.com/177a02310dd44a25c55c5e26f903a241/tumblr_nwr0qc8z3D1tc28zvo5_1280.png",
                "https://64.media.tumblr.com/10b505fa86ab1639bcb71f6f6273d682/tumblr_nwr0qc8z3D1tc28zvo6_1280.png",
                "https://64.media.tumblr.com/26651b1b881080e89a252e323c0dfbc9/tumblr_nwr0u40gkn1tc28zvo6_1280.png",
                "https://64.media.tumblr.com/75eecce50025259c67b2af145530012c/tumblr_nwr0u40gkn1tc28zvo3_1280.png",
                "https://64.media.tumblr.com/2d38cbef152cf299bbbed1d1e2f918a2/tumblr_nwr0qc8z3D1tc28zvo1_1280.png"  
              ];

 let x = Math.floor(Math.random() * theImg.length);
 document.body.style.backgroundImage = 'url('+theImg[x]+')';
  } 

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
let gameIsRunning = true;

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
  gameIsRunning = false;
  setTimeout(function () {
    alert(msg);
},1000);
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  if(gameIsRunning === false)
  return;
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
  document.getElementById("btn").onclick = function() { 
  location.reload(); 
} 
randBack();
makeBoard();
makeHtmlBoard();
