class BoggleGame {
  constructor(boardID, seconds = 60) {
    this.seconds = seconds;
    this.score = 0;
    this.words = new Set();
    this.board = $('#' + boardID);

    this.showTimer();

    this.timer = setInterval(this.ticking.bind(this), 1000);
    $('.add-word', this.board).on('submit', this.handleSubmit.bind(this));
  }

  showWord(word) {
    // take the words you have and add them to a list
    $(".words", this.board).append($('<li>', {text: word}));
  }

  showScore() {
    // add score info onto the board
    $('.score', this.board).text(this.score);
  }

   showMessage(msg,cls) {
     $('.msg', this.board).text(msg).removeClass().addClass(`msg ${cls}`);
   }

   async handleSubmit(e) {
     e.preventDefault();
     const $word = $('.word', this.board);
     
     let word = $word.val();
     if (!word) return;

     if (this.words.has(word)) {
       this.showMessage(`Already found ${word}`, 'error');
       return;
     }
    //  This part checks if words exist retreives it from server
     const resp = await axios.get("/check", { params: { word: word }});
     if (resp.data.result === "not-word") {
       this.showMessage(`${word} is not a valid English word`, 'error');
        } 
     else if (resp.data.result === "not-on-board") {
       this.showMessage(`${word} is not a valid word on this board`, 'error');
        } else {
          this.showWord(word);
          this.score += word.length;
          this.showScore();
          this.words.add(word);
          this.showMessage(`Added: ${word}`, "ok");
        }
     $word.val("").focus();
   }
 
   showTimer() {
    $('.timer', this.board).text(this.seconds);
   }

   async ticking() {
     this.seconds -= 1;
     this.showTimer();

     if (this.seconds === 0) {
       clearInterval(this.timer);
       await this.scoreGame();
     }
   }

   async scoreGame() {
     $('.add-word', this.board).hide();

     const res = await axios.post("/score", {score: this.score});
     if (res.data.newRecord) {
       this.showMessage(`New Record: ${this.score}`, 'ok');
     } else {
       this.showMessage(`Final Score: ${this.score}`, 'ok');
     }
  }
}
