
const fs = require('fs');
const process = require('process');
const axios = require('axios');

/* funcction reads out file and prints it */
function cat(path) { 
    fs.readFile(path, "utf8", function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(data);
      });
}

/* function passes url and reads data from it */
async function webCat(url) {
    try{
      let response = await axios.get(url);
      console.log(response.data);
    // catch { if (err){ argument }} (does this work as well?)
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }


//need tp pass path for if statement
let path = process.argv[2];
//check if it's a url (don't use splice it changes array of path, slice doesn't it makes a copy)
if (path.slice(0,4) === 'http') {
    webCat(path);
} else {
    cat(path);
}