// Gets all pre existing items from Db
const items = require("./fakeDb")

const ExpressError = require("./expressError");

// easier to export class vs all the individual functions
class Item {
  constructor(name, price) {
      this.name = name;
      this.price = price;

      //need to add all the items in the list
      items.push(this);
  }

  //create function to findall items
  static findAll() {
      return items
  }
  
  // function to find item of choice
  static find(name) {
    const found = items.find(f => f.name === name);
    if(found === undefined){
      throw new ExpressError("Item not found", 404);
    }
    return found;
  }

  // update matching item to existing item in data = {name, price}
  static update(name, data) {
    // get info from paased in data not Db (Item not items)
    const sameItem = Item.find(name);
    if(sameItem === undefined){
        throw new ExpressError("Item not found", 404);
      }
    sameItem.name = data.name;
    sameItem.price = data.price 

    return sameItem;
  }

  // remove an item 
  static remove(name) {
    // check for index of the value
    let fIdx = items.findIndex(i => i.name === name);
    //make sure there is no empty array
    if (fIdx === -1) {
      throw new ExpressError("Item not found", 404);
    }
    // remove specific item (use the checked index)
    items.splice(fIdx,1)
    // this method only good for objects
    // delete items[fIdx]
  }
}

module.exports = Item;