function App() {
    return (
      <div>
        <Tweet 
            username="puttycat"
            name="Jerry Mouse"
            date={new Date().toDateString()}
            message="You will never get this"
            />
        <Tweet 
            username="deadmouse"
            name="Tom Cat"
            date={new Date().toDateString()}
            message="Get in my belly"
            />
        <Tweet 
            username="sprinkes"
            name="Dragon Lord"
            date={new Date().toDateString()}
            message="I can do what ever I want"
            /> 
      </div>
    );
  }

  // typo will affect entire input
