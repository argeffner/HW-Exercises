const Person = (props) => {
 let data;
  if (props.age >= 18) {
    data = "Please go vote"
  } else {
    data = "you're not 18 yet"
  }
  let name = props.name.length > 8 ? props.name.slice(0,6) : props.name;

  return (
    <div>
      <p> Learn some information about this person:
      </p>
      <ul>
          <li>Name: {name}</li>
          <li>Age: {props.age}</li>
          <ul>
            Hobbies: 
            {props.hobbies.map(hob => 
            <li> {hob} </li>)}
          </ul>
      </ul>
      <h3>{data}</h3>
    </div>
  )
}