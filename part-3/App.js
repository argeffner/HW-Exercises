function App() {
    return (
      <div>
        <Person 
            name="Stewie"
            age={5}
            hobbies={["time-traveling","Killing Lois", "brian", "men"]}
            />
        <Person 
            name="Sauron"
            age={10000}
            hobbies={["Creating order in the universe", "conquering Middle Earth", "Rings of power", "Killing hobbits"]}
            />
        <Person 
            name="Voldemort"
            age={70}
            hobbies={["Exterminating Muggles", "Kill Harry Potter", "make more Horcruxes", "building an army"]}
            />
        
      </div>
    );
  }


