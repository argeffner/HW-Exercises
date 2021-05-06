import React, {useState} from 'react';
import './ColorBox.css';

function ColorBox(props) {
    const [color, setColor] = useState();

  let rIdx = () => Math.floor(Math.random() * (props.colors.length));

  function handleClick() {
    const { box, color } = props.colors[rIdx];
    setColor(color);
    setBox(rIdx);

    const listBoxes = box.map((color, i) =>
    <div ></div>
    }  
  
  return (
      <div>
        <section> 
            <div className="box" 
                style={{backgroundColor: color }}>
            </div>
        </section>
        <button onClick={handleClick}>Rondom box and color</button>
      </div>
      )
}


ColorBox.defaultProps = {
    colors: [
    { color: "green" },
    { color: "linen" },
    { color: "red" },
    { color: "mediumorchid" },
    { color: "lightsalmon" },
    { color: "lightcyan" },
    { color: "lavender" },
    { color: "lightcoral" },
    { color: "lighskyblue" },
    { color: "lawngreen" },
    { color: "hotpink" },
    { color: "indigo" },
    { color: "gray" },
    { color: "black" },
    { color: "peru" },
    { color: "yellow" },
  ]};

  export default ColorBox;