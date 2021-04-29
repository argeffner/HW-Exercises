const Tweet = (props) => (
  <div className="tweet">
    <span className="username"> {props.username} </span>
    <span className="theName">{props.name}</span>
    <span className="date">{props.date}</span>
    <p className="message">{props.message}</p>
  </div>
)

// classnames for when i will need to add css