$(function() {
let baseURL = "https://deckofcardsapi.com/api/deck";


// P2.1
async function drawNew() {
  let res = await $.getJSON(`${baseURL}/new/draw`);
  let {value, suit} = res.cards[0];
  console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}

// P2.2
async function drawExtra() {
  let first = await $.getJSON(`${baseURL}/new/draw`);
  let deckId = first.deck_id;
  let second = await $.getJSON(`${baseURL}/${deckId}/draw`);
  [first, second].forEach(card => {
  // need to access first.cards[0] and second.cards[0]
  let { suit, value } = card.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });
}

// P2.3
async function flipCards() {
  // deckId = Data.deck_id; can use shortcut
  let data = await $.getJSON(`${baseURL}/new/shuffle`);
  $('button').show().on('click', async function() {
  let Data = await $.getJSON(`${baseURL}/${data.deck_id}/draw`);
  let angle = (Math.random() * 90) - 45;
  let xDir = (Math.random() * 10) - 5;
  let yDir = (Math.random() * 10) - 5;
  let crd = Data.cards[0].image;
  $('#card-space').append(
    $('<img>', 
    {src: crd, 
      css: { transform: `translate(${xDir}px, ${yDir}px) rotate(${angle}deg)`}
    }) 
  );
  // removes button after all cards have been dealt
  if (Data.remaining === 0) $('button').remove();
  });
 }


});