$(function() {
let baseURL = "https://pokeapi.co/api/v2";


// P3.1
async function pokemonAll() {
  // checked and the limit is 1118 for some reason
 let data = await $.getJSON(`${baseURL}/pokemon/?limit=1118`);
 console.log(data);
}

// P3.2
async function random3() {
  let data = await $.getJSON(`${baseURL}/pokemon/?limit=1118`);
  let pokeThree = [];
  for (let i=0; i<3; i++) {
    let pokeIdx = Math.floor(Math.random() * data.results.length);
    // the spliced item selects the number aray from results 
    // then to get url you need to enter array with selctedarray[0].url  
    let newURL = data.results.splice(pokeIdx,1)[0].url; 
    pokeThree.push(newURL);
  }
  let pokeData = await Promise.all(
    pokeThree.map(newURL => $.getJSON(newURL))
  );
  pokeData.forEach(poke => console.log(poke));
}

// P3.3
async function pokeDescribe(){
  let data = await $.getJSON(`${baseURL}/pokemon/?limit=1118`);
  let pokeThree = [];
  for (let i=0; i<3; i++) {
    let pokeIdx = Math.floor(Math.random() * data.results.length); 
    let newURL = data.results.splice(pokeIdx,1)[0].url; 
    pokeThree.push(newURL);
  }
  let pokeData = await Promise.all(
    pokeThree.map(newURL => $.getJSON(newURL))
  );
  let pokeSpecies = await Promise.all(
    // make sure to map this data
  pokeData.map(poke => $.getJSON(poke.species.url))
  );
  information = pokeSpecies.map(info => {
    // get description from flavor_text_entries key but in english
    let infoData = info.flavor_text_entries.find(
      lang => lang.language.name === "en"
    );
    // return infoData ? infoData.flavor_text : "No description available.";
    if (infoData) {
      return infoData.flavor_text
    }
    else {
      return "There is no pokemon desciption."
    }
  });
  information.forEach((description, i) => {
     console.log(`${pokeData[i].name}: ${description}`)
    });
}

// p3.4
// do the same as the above but make cards on html
$('button').show().on('click', async function() {
  let data = await $.getJSON(`${baseURL}/pokemon/?limit=1118`);
  $('#card-space').empty(); // clear the space each time for 3 new cards
  let pokeThree = [];
  for (let i=0; i<3; i++) {
    let pokeIdx = Math.floor(Math.random() * data.results.length); 
    let newURL = data.results.splice(pokeIdx,1)[0].url; 
    pokeThree.push(newURL);
  }
  let pokeData = await Promise.all(
    pokeThree.map(newURL => $.getJSON(newURL))
  );
  let pokeSpecies = await Promise.all(
  pokeData.map(poke => $.getJSON(poke.species.url))
  );
  pokeSpecies.forEach((info,i) => {
    let infoData = info.flavor_text_entries.find(
      lang => lang.language.name === "en"
    );
    // need to take the img poemon name and desciption and pass to other function
    let description = infoData ? infoData.flavor_text : "No data";
    let name = pokeData[i].name;
    // image is in sprites choose the default front image not back image
    // let img = pokeData[i].sprites.front_default || "https://static.wikia.nocookie.net/pokemontowerdefense/images/0/0a/Screen_shot_2011-06-11_at_6.54.52_AM.png/revision/latest?cb=20110615165103";
    let img = pokeData[i].sprites.front_default ? pokeData[i].sprites.front_default : "https://static.wikia.nocookie.net/pokemontowerdefense/images/0/0a/Screen_shot_2011-06-11_at_6.54.52_AM.png/revision/latest?cb=20110615165103";
    $('#card-space').append(pokemonCard(name, img, description))
    console.log(img)
    });
  });

function pokemonCard(name, img, desciption) {
  return `
   <div class="pokemon">
    <h1> ${name} </h1>
    <img src=${img}>
    <p>${desciption}</p>
    </div>
    `;
}

random3();
pokemonAll();
pokeDescribe();
});