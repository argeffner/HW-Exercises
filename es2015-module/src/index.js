import fruits from './fruits';
import { remove, choice} from './helper';

let fruit = choice(fruits);

console.log(`Buyer: I’d like one ${fruit}, please.`);
console.log(`Seller: Here you go ${fruit}`);
console.log('Buyer: Please sir, Can I have some more?');
let cart = remove(fruit, fruits);
console.log(`Seller: No, I'm all out. We have ${cart.length} left. Buy a different fruit or go cry to grandma you spoiled baby`);


