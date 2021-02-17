/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }
  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let markov = new Map();
    for (let i = 0; i <= this.words.length; i++){
      let word = this.words[i];
      // requested to put null for last word array.
      let next = this.words[i+1] || null;
      //check if word is in array otherwise create set with next word in object
      if (markov.has(word)) { 
        // markov[word].push(next); (doesn't work in map object)
        // retrieves word and pushes next word
        markov.get(word).push(next);
      } else {
        // markov[word] = next; (doesn't work in map object)
        markov.set(word, [next]);
      }
    }
    // now that markov has a value it needs to be set by this method
    this.markov = markov;
  }
 // use static in class instead of const
  static rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  /** return random text from chains */
/* reference
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  makeText(numWords = 100) {
    //set keys and array;    object.keys() = this.markov.keys()
    let keys = Array.from(this.markov.keys());
    // select on random key
    let key = MarkovMachine.rand(keys);  // use the static function for keys
    // set up markov chain array for text
    let chainText = [];

    // need to make sure that you stop when value at key is null and that you don't exceed numwords.
    while ((chainText.length < numWords) && (key !== null)) {
      chainText.push(key);
      // takes a random value from specific key and sets it as the new key (this.markov.get(key) => value)
      key = MarkovMachine.rand(this.markov.get(key))
    }
    // now create text by joining the array
    chainText.join(" ");
  }
}

// create module and dependency for makeText.js
module.exports = { MarkovMachine };
