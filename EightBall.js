import React, {useState} from 'react';
import './EightBall.css'

function EightBall(props) {
    const [msg, setMsg] = useState("Think of a Question");
    const [color, setColor] = useState("black");
    const [greenCount, setGreenCount] = useState(0);
    const [orangeCount, setOrangeCount] = useState(0);
    const [redCount, setRedCount] = useState(0);

    const restart = () => {
      setMsg("Think of a Question");
      setColor("black");
      setGreenCount(0);
      setOrangeCount(0);
      setRedCount(0);
    }

  function handleClick() {
    const { msg, color } = props.responses[Math.floor(Math.random() * (props.responses.length))];
    setMsg(msg);
    setColor(color);
    }  
  function Guess() {
    if (color === 'green') { setGreenCount(greenCount + 1)};
    if (color === 'goldenrod') { setOrangeCount(orangeCount + 1)};
    if (color === 'red') { setRedCount(redCount + 1)};
  }
   const allFunc = () => {
     handleClick();
     Guess();
   }

  return (
    <div>
      <div
        className="Eightball" 
        onClick={allFunc}
        style={{backgroundColor: color }}>
            <h3>
                <b>{msg}</b>
            </h3>
      </div>
      <div>
        <h1># of times colors showed up</h1>
          <h2>
            <span className="green">Green: {greenCount}</span> 
            &nbsp;&nbsp;&nbsp;
            <span className="orange">Orange: {orangeCount}</span> 
            &nbsp;&nbsp;&nbsp;
            <span className="red">Red: {redCount}</span> 
          </h2>
        </div>
        <br/>
      <button onClick={restart}>Again</button>
    </div>
      )
}


EightBall.defaultProps = {
    responses: [
    { msg: "It is certain.", color: "green" },
    { msg: "It is decidedly so.", color: "green" },
    { msg: "Without a doubt.", color: "green" },
    { msg: "Yes - definitely.", color: "green" },
    { msg: "You may rely on it.", color: "green" },
    { msg: "As I see it, yes.", color: "green" },
    { msg: "Most likely.", color: "green" },
    { msg: "Outlook good.", color: "green" },
    { msg: "Yes.", color: "green" },
    { msg: "Signs point to yes.", color: "goldenrod" },
    { msg: "Reply hazy, try again.", color: "goldenrod" },
    { msg: "Ask again later.", color: "goldenrod" },
    { msg: "Better not tell you now.", color: "goldenrod" },
    { msg: "Cannot predict now.", color: "goldenrod" },
    { msg: "Concentrate and ask again.", color: "goldenrod" },
    { msg: "Don't count on it.", color: "red" },
    { msg: "My reply is no.", color: "red" },
    { msg: "My sources say no.", color: "red" },
    { msg: "Outlook not so good.", color: "red" },
    { msg: "Very doubtful.", color: "red" },
  ]};

  export default EightBall;