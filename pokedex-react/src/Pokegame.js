import React from 'react';
import Pokedex from './Pokedex';
import './Pokegame.css';

Pokegame.defaultProps = {
    pokemon: [
      { id: 4, name: "Charmander", type: "fire", base_experience: 62 },
      { id: 7, name: "Squirtle", type: "water", base_experience: 63 },
      { id: 11, name: "Metapod", type: "bug", base_experience: 72 },
      { id: 12, name: "Butterfree", type: "flying", base_experience: 178 },
      { id: 25, name: "Pikachu", type: "electric", base_experience: 112 },
      { id: 39, name: "Jigglypuff", type: "normal", base_experience: 95 },
      { id: 94, name: "Gengar", type: "poison", base_experience: 225 },
      { id: 133, name: "Eevee", type: "normal", base_experience: 65 }
    ]
  };

let vs = 'https://cdn1.vectorstock.com/i/1000x1000/87/95/versus-game-cover-banner-sport-vs-team-concept-vector-28928795.jpg';

function Pokegame(props) {
    let deck = [...props.pokemon];
    let hand1 = [];
    let hand2 = [];

    while (deck.length !== 0) {
        let rIdx = Math.floor(Math.random() * deck.length);

        if (hand1.length >= hand2.length) {
            let randPokemon = deck.splice(rIdx, 1)[0];
            hand2.push(randPokemon);
        }
       else if (hand1.length < hand2.length) {
            let randPokemon = deck.splice(rIdx, 1)[0];
            hand1.push(randPokemon);
        }
    }
    
    // experiece acc and you start with 0
    let exp1 = hand1.reduce( (exp, pokemon) => exp + pokemon.base_experience, 0);
    let exp2 = hand2.reduce( (exp, pokemon) => exp + pokemon.base_experience, 0);

    return (
        <div>
          <h1 className="Main"> Pokemon Battle</h1>
          <br/>
          <Pokedex pokemon={hand1} exp={exp1} victory={exp1 > exp2} />
          <div className="trim">
            <img className="vs" src={vs} alt=''/>
          </div>
          <Pokedex pokemon={hand2} exp={exp2} victory={exp2 > exp1} />
        </div>
      );
}


export default Pokegame;