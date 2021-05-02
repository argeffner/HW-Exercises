import React from 'react';
import './Pokedex.css'
import Pokecard from "./Pokecard"

// for pokedex route only
// Pokedex.defaultProps = {
//     pokemon: [
//     {id: 4, name: 'Charmander', type: 'fire', base_experience: 62},
//     {id: 7, name: 'Squirtle', type: 'water', base_experience: 63},
//     {id: 11, name: 'Metapod', type: 'bug', base_experience: 72},
//     {id: 12, name: 'Butterfree', type: 'flying', base_experience: 178},
//     {id: 25, name: 'Pikachu', type: 'electric', base_experience: 112},
//     {id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95},
//     {id: 94, name: 'Gengar', type: 'poison', base_experience: 225},
//     {id: 133, name: 'Eevee', type: 'normal', base_experience: 65}
//   ]
// };

function Pokedex(props) {
   let victoryRoad = null;
    if (props.victory) {
      victoryRoad = <p className="dex-win">THIS HAND WINS!</p>;
    }
  return (
    <div className="Pokedex">
        <h2 className="dex-title">Pokemon Trainer</h2>
        <div className="dex-cards">
            {props.pokemon.map(p => (
             <Pokecard 
                id={p.id} 
                name={p.name} 
                type={p.type} 
                exp={p.base_experience} />
            ))}
        </div>
        <h3>Total experience: {props.exp}</h3>
      {victoryRoad}
    </div>  
    );
}
export default Pokedex;
