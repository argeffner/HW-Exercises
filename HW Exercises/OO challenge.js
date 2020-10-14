//    1)
//Create a class for vehicle. Each vehicle instance should have the following properties: make, model, year.
//Each vehicle instance should have access to a method called honk, which returns the string “Beep.”

// let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
// myFirstVehicle.honk(); // "Beep."
// Each vehicle instance should have a method called toString, which returns the string containing the make, model and year.

// let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
// myFirstVehicle.toString(); // "The vehicle is a Honda Monster Truck from 1999."

class Vehicle {
    constructor(make, model, year) {
        if(!isNaN(parseFloat(make)) || !isNaN(parseFloat(model))) {
            console.log('put a string only');
        }
        if(isNaN(year) && (1900 > year ||  year > 2021)) {
            console.log("make sure it's a number and that the year is betwee 1900 and 2021");
        }
this.make = make;
this.model = model;
this.year = year;
    }

    honk() {
        console.log("Beep");
    }
    toString() {
        console.log(`The vehicle is a ${this.make}  ${this.model} from ${this.year}`);
    }
}

// 2) 
// Create a class for a car. The Car class should inherit from Vehicle and each car instance should have a property called numWheels which has a value of 4.

class Car extends Vehicle {
    constructor(make, model, year){
        super(make, model, year);
    }
    numWheels() { 
        return 4;
    }
}

// 3)
//Create a class for a Motorcycle. This class should inherit from Vehicle and each motorcycle instance should have a property called numWheels which has a value of 2. It should also have a revEngine method which returns “VROOM!!!”

class Motorcycle extends Vehicle {
    constructor(make, model, year){
        super();
    }
    numWheels() { 
        return 2;
    }
    revEngine() {
        return "VROOM!!!";
    }
}

// 4)
/* Create a class for a Garage. It should have a property called vehicles which will store an array of vehicles, and a property called capacity which is a number indicating how many vehicles will fit in the garage. When you create a garage, vehicles will always be empty; you only need to provide the capacity.

A garage should also have an add method, which attempts to add a vehicle to the array of vehicles. However, if you try to add something which is not a vehicle, the garage should return the message “Only vehicles are allowed in here!”. Also, if the garage is at capacity, it should say “Sorry, we’re full.” 
*/

class Garage {
    constructor(capacity) {
        this.Vehicles = [];
        this.capacity = capacity
    }

    add(newVehicle){
        if(this.Vehicles.length >= this.capacity) {
            return "Sorry we're full."
        }
        if(!(newVehicle instanceof Vehicle)){
            return "Ony allowed to park vehicles in here!"
        }
        this.Vehicles.push(newVehicle);
        return "Vehicle added"
    }
}