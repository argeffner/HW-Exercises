import React, {useState} from "react";
import "./Coin.css";

Coin.defaultProps = {
    coin: [
    {side: 'heads', 
     image: 'https://www.moneymetals.com/images/products/2016-gold-eagles-tenth-obverse.jpg'
    },
    {side: 'tails',
     image: 'https://www.moneymetals.com/images/products/20dollar-st-gaudens-double-eagle-coin-reverse.jpg'
    },
]};

function Coin(props) {
        const [coin, setCoin] = useState(null);
        const [headCount, setHeadCount] = useState(0);
        const [tailCount, setTailCount] = useState(0);

      function handleClick() {
        const reCoin = props.coin[Math.floor(Math.random() * (2))];
        setCoin(reCoin);
        
        if (reCoin.side === 'heads') { setHeadCount(headCount + 1)};
        if (reCoin.side === 'tails') { setTailCount(tailCount + 1)};
      };
    
      let theCoin = coin ? (
        <img className="Coin-image" src={coin.image} alt={coin.side} />
      ) : null;

    return (
      <div className="Coin">
        <h2 className="Coin-title">Heads or Tails?</h2>
        {theCoin}
        <br></br>
        <button onClick={handleClick}>Flip</button>
        <p> 
            Out of {headCount + tailCount} flips, there have been {headCount} heads
            and {tailCount} tails.
        </p> 
      </div>
    );
  }

export default Coin;