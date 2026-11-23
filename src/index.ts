import { CharactersCollection } from "./CharactersCollection.js";
import { NumbersCollection } from "./NumbersCollection.js";

// create new instance of our collections
const myArrayOfNumbers = new NumbersCollection([20, 4, -10, 0, -2]);
const myCollectionOfChars = new CharactersCollection("XdAjFceiDzs");

//calling sort on new instance
myArrayOfNumbers.sort();
myCollectionOfChars.sort();

//logs
console.log(myArrayOfNumbers.data);
console.log(myCollectionOfChars.data);
