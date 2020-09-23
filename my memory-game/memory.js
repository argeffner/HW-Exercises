document.addEventListener("DOMContentLoaded", function(){
    const cards = document.querySelectorAll(".card")
    
    cards.forEach(card=> card.addEventListener('click',flipCard));
    
    let hasFlipped = false;
    let lockCard = false;
    let firstCard, secondCard;
    
    
    function flipCard(){
    if (lockCard) return;
    if (this === firstCard) return;
    
      this.classList.add('flip');
    
      if(!hasFlipped){
        //first click
        hasFlipped = true;
        firstCard = this;
        return; 
      } 
      
        ////second click
        //hasFlipped = false;
        secondCard = this;
    
         matchingTime();
    }
        function matchingTime(){
          let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    
          isMatch ? disableCards() : noMatch();
        // if(firstCard.dataset.framework === secondCard.dataset.framework) {
        //     //matched cards 
        //  disableCards();
        // } else { 
        //   //cards don't match
        //   noMatch();
        // }
      }
    
     function disableCards(){
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
    
      resetMyCards();
     }
    
     function noMatch() {
        lockCard = true;
    
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    
        resetMyCards();
        //lockCard = false;
      }, 1000)
     }
    
     function resetMyCards(){
       [hasFlipped, lockCard] = [false,false];
       [firstCard, secondCard] = [null, null];
     }
    
     (function shuffling(){
      cards.forEach(card => {
       let randomY = Math.floor(Math.random()*16);
       card.style.order = randomY;
      });
     })();
    ////     )() is and immediate invoked expression 
    
    })