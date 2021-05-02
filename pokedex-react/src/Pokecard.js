import React from 'react';
import './Pokecard.css'

let pokAPI = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

function Pokecard(props) {
    let image = `${pokAPI}${props.id}.png` ;

    return (
        <div className="Pokecard">
            <div className="poke-title">{props.name}</div>
            <img className='poke-image' src={image} alt=''/>
            <div className="poke-type">Type: {props.type}</div>
            <div className='poke-exp'>EXP: {props.exp}</div>
        </div>
    )
}


export default Pokecard;
