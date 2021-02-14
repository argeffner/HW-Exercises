
const fs = require('fs');
const process = require('process');

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

// process of the path 
cat(process.argv[2]);

//process.argv[0]  is path to node
//process.argv[1]  is path to file
//process.argv[2]  is path to arguments
//process.argv[3]  is path to additional arguments