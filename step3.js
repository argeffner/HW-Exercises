
const fs = require('fs');
const process = require('process');
const axios = require('axios');

/* argument output or print in console */
function outPut(text, out) {
    if (out) {
        fs.writeFile(out, text, "utf8", function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
    });
            } else {
                console.log(text);
            }
}

/* funcction reads out file and prints it */
function cat(path, out) { 
    fs.readFile(path, "utf8", function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        outPut(data, out);
      });
}

/* function passes url and reads data from it */
async function webCat(url, out) {
    try{
    let response = await axios.get(url);
    outPut(response.data, out);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
  }

let path;
let out;
// if --out comes first then out = argv[3] and path = argv[4]
if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2]; 
}

//check if it's a url (don't use splice it changes array of path, slice doesn't it makes a copy)
if (path.slice(0,4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}



/*
function cat(path) { }

function catWrite(path, filename) { }

function webCat(url) { }

function webCatWrite(path, filename) { }

*/