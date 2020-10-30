/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
// making an interchangeable background image for each reset

  class Game  {
    constructor(p1, p2, height = 6, width = 7) {
      
      // super(Rick, Morty, Jerry, Summer, Beth, MisterMeeseeks);
      this.randBack();
      this.players = [p1, p2];
      this.height = height;
      this.width = width;
      this.currPlayer = p1;
      this.makeBoard();
      this.makeHtmlBoard();
      this.gameOver = false;
    }
  
     randBack(){
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
                    "https://64.media.tumblr.com/e2aa898df2f0e45f4d0a25745153d11a/tumblr_nwr0qc8z3D1tc28zvo2_1280.png",
                    "https://64.media.tumblr.com/177a02310dd44a25c55c5e26f903a241/tumblr_nwr0qc8z3D1tc28zvo5_1280.png",
                    "https://64.media.tumblr.com/10b505fa86ab1639bcb71f6f6273d682/tumblr_nwr0qc8z3D1tc28zvo6_1280.png",
                    "https://64.media.tumblr.com/26651b1b881080e89a252e323c0dfbc9/tumblr_nwr0u40gkn1tc28zvo6_1280.png",
                    "https://64.media.tumblr.com/75eecce50025259c67b2af145530012c/tumblr_nwr0u40gkn1tc28zvo3_1280.png",
                    "https://64.media.tumblr.com/2d38cbef152cf299bbbed1d1e2f918a2/tumblr_nwr0qc8z3D1tc28zvo1_1280.png"  
                  ];
    
     let randy = Math.floor(Math.random() * theImg.length);
     document.body.style.backgroundImage = 'url('+theImg[randy]+')';
      } 
    /** makeBoard: create in-JS board structure:
     *   board = array of rows, each row is array of cells  (board[y][x])
     */
     display(){
       console.log(this.currPlayer, this.players[1]);
      }

    makeBoard() {
      this.board = [];
      for (let y = 0; y < this.height; y++) {
        this.board.push(Array.from({ length: this.width }));
      }
    }
  
    /** makeHtmlBoard: make HTML table and row of column tops.  */
  
    makeHtmlBoard() {
      const board = document.getElementById('board');
      board.innerHTML = '';
  
      // make column tops (clickable area for adding a piece to that column)
      const top = document.createElement('tr');
      top.setAttribute('id', 'column-top');
  
      // store a reference to the handleClick bound function 
      // so that we can remove the event listener correctly later
      this.handleGameClick = this.handleClick.bind(this);
      
      top.addEventListener("click", this.handleGameClick);
  
      for (let x = 0; x < this.width; x++) {
        const headCell = document.createElement('td');
        headCell.setAttribute('id', x);
        top.append(headCell);
      }
  
      board.append(top);
  
      // make main part of board
      for (let y = 0; y < this.height; y++) {
        const row = document.createElement('tr');
      
        for (let x = 0; x < this.width; x++) {
          const cell = document.createElement('td');
          cell.setAttribute('id', `${y}-${x}`);
          row.append(cell);
        }
      
        board.append(row);
      }
    }
  
    /** findSpotForCol: given column x, return top empty y (null if filled) */
  
    findSpotForCol(x) {
      for (let y = this.height - 1; y >= 0; y--) {
        if (!this.board[y][x]) {
          return y;
        }
      }
      return null;
    }
  
    /** placeInTable: update DOM to place piece into HTML board */
  
    placeInTable(y, x) {
      const piece = document.createElement('div');
      piece.classList.add('piece');
      piece.style.backgroundSize = "100px";
      piece.style.backgroundPosition = "center";
      piece.style.backgroundImage = this.currPlayer.token
      piece.style.top = -50 * (y + 2);
  
      const spot = document.getElementById(`${y}-${x}`);
      spot.append(piece);
    }
  
    /** endGame: announce game end */
  
    endGame(msg) {
      setTimeout(function () {
        alert(msg);
    },700);
      const top = document.querySelector("#column-top");
      top.removeEventListener("click", this.handleGameClick);
    }
  
    /** handleClick: handle click of column top to play piece */
  
    handleClick(evt) {
      // get x from ID of clicked cell
      const x = +evt.target.id;
  
      // get next spot in column (if none, ignore click)
      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }
  
      // place piece in board and add to HTML table
      this.board[y][x] = this.currPlayer;
      this.placeInTable(y, x);
  
      // check for tie
      if (this.board.every(row => row.every(cell => cell))) {
        return this.endGame(' A Tie? Seriously?');
      }
  
      // check for win
      if (this.checkForWin()) {
        this.gameOver = true;
        return this.endGame(` ${this.currPlayer.winMsg} `);
      }
  
      // switch players
      this.currPlayer =
        this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    }
  
    /** checkForWin: check board cell-by-cell for "does a win start here?" */
  
    checkForWin() {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
      const _win = cells =>
        cells.every(
          ([y, x]) =>
            y >= 0 &&
            y < this.height &&
            x >= 0 &&
            x < this.width &&
            this.board[y][x] === this.currPlayer
        );
  
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          // get "check list" of 4 cells (starting here) for each of the different
          // ways to win
          const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
          const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
          const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
          const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
          // find winner (only checking each win-possibility as needed)
          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
            return true;
          }
        }
      }
    }
  }


    function character(name){
      let char = {};
    if(name === "Rick") {
        char = {
      winMsg: `You're an idiot`,
      token: 'url(https://media1.giphy.com/media/IgpAALi5hEv1IFmCrZ/giphy.gif?cid=ecf05e47b7bu86i8j9xzn61ccuelek52jcyni635ygzymypg&rid=giphy.gif)'
        }};
    if(name === "Morty") {
        char = {
         winMsg: `I won. Can we go home now?`,
         token: 'url(https://media1.giphy.com/media/W35DnRbN4oDHIAApdk/giphy.gif?cid=ecf05e47ry1yf7t25hw9nodo2z6gweig9qpyy08ris9g0tqd&rid=giphy.gif)'
        }};
    if(name === "Jerry") {
       char = {
         winMsg: `Look I actually won, Yay!`,
         token: 'url(https://media2.giphy.com/media/MaxUtki5xQdQLwUPW1/giphy.gif?cid=ecf05e47hq28covh9ulvo7ogxppfyq5vdas5n9wsdqt6mtym&rid=giphy.gif)'
        }};
    if(name === "Beth") {
       char = {
        winMsg: `Of couse I won`,
        token: 'url(https://media0.giphy.com/media/UVNImrTih6ptsVK1br/giphy.gif?cid=ecf05e47sxuke0xacur3e2cigwyw7evnx7uvkhgqaoyt40pf&rid=giphy.gif)'
        }};
    if(name === "Summer") {
       char = {
        winMsg: `Whatever`,
        token: 'url(https://media3.giphy.com/media/YMG6EIg4nkId3x2n61/giphy.gif?cid=ecf05e4765hsvx8n1kvl1jfmu5ubthq6c52gti98smfa4505&rid=giphy.gif)'
        }};
    if(name === "MisterMeeseeks") {
       char = {
        winMsg: `I'm Mr. Meeseeks look at me`,
        token: 'url(https://media2.giphy.com/media/WvOjT988OZiNy/giphy.gif?cid=ecf05e474y1aqlp5r4tpqpw1m8gvdigspcmyrbvh0kgeayp4&rid=giphy.gif)'
        }};

        return char;
    }
    
    document.getElementById("Other").style.display = "none";
    document.getElementById("btn").style.display = "none";

  document.getElementById('start-game').addEventListener('click', () => {
    document.getElementById("p1-character").style.display = "none";
    document.getElementById("p2-character").style.display = "none";
    document.getElementById("Hint").style.display = "none";
    

    let char1 = document.getElementById('p1-character').value;
    let char2 = document.getElementById('p2-character').value;
    let p1 = character(char1);
    let p2 = character(char2);
  
    document.getElementById("btn").style.display = "block";
    document.getElementById("Other").style.display = "block";

    document.getElementById("btn").onclick = function() { 
      location.reload(); 
    } 
    if (char1 === char2){
      alert("WHO CARES, THERE ARE INFINITE DIMENSIONS")
    }
    const tryOne = new Game(p1, p2);
    //the below line was for testing to see if obects were passed in
    //tryOne.display()
  });
  

