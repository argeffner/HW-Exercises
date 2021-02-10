$(function() {
let baseURL = "https://deckofcardsapi.com/api/deck";
// need to make a favorite number


// P2.1
  $.getJSON(`${baseURL}/new/draw`)
   .then(Data => { let {value, suit} = Data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });

// P2.2
  $.getJSON(`${baseURL}/new/draw`)
   .then(Data => { 
    //  why do I not need to use let or const for firstDraw?
    firstDraw = Data.cards[0];
    let deckId = Data.deck_id;
    // console.log(firstDraw);
    return $.getJSON(`${baseURL}/${deckId}/draw`);
  })
  .then(Data => {
    secondDraw = Data.cards[0];
    // console.log(`
    // ${firstDraw.value.toLowerCase()} of ${firstDraw.suit.toLowerCase()},
    // ${secondDraw.value.toLowerCase()} of ${secondDraw.suit.toLowerCase()}
    // `);
    // in the long run this is more efficient to write
    [firstDraw, secondDraw].forEach(function(card) {
      console.log(
        `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
      );
   })
})

// P2.3
// use shuffle so that you don't use the same card accidentally
  $.getJSON(`${baseURL}/new/shuffle`) 
  .then(Data => {
     deckId = Data.deck_id;
    $('button').show();
  });  

  $('button').on('click', function() {
   $.getJSON(`${baseURL}/${deckId}/draw`).then(Data => {
    // get image and create random angles and slight positioning
    let angle = (Math.random() * 90) - 45;
    let xDir = (Math.random() * 10) - 5;
    let yDir = (Math.random() * 10) - 5;
    let crd = Data.cards[0].image;
    // add the cards to page
    $('#card-space').append(
      $('<img>', 
      {src: crd, 
        css: { transform: `translate(${xDir}px, ${yDir}px) rotate(${angle}deg)`}
      }) 
    );
    // removes button after all cards have been dealt
    if (Data.remaining === 0) $('button').remove();
    });
   });
})


