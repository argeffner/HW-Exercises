/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const markov = require('./markov'); // selects the markov.js file for dependency
const process = require('process');

function getText(text) {
    let mark = new markov.MarkovMachine(text);
    console.log(mark.createText())
}
// get text from file eggs.txt
function createText(path) {
    fs.readFile(path, "utf8", function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
          createText(data);
        }
   });
}
// get text from url
async function createUrlText(url) {
    let response; // this way reponse is the same throughout function
    try {
        response = await axios.get(url);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    createText(response.data);
}

// uses all argv EXCLUDING process.argv[1] and process.argv[2]
let [method, path] = process.argv.slice(2);

if (method === 'file') {
    createText(path);
}
else if (method === 'url') {
    createUrlText(path);
} else {
    console.error(err);
    process.exit(1);
}