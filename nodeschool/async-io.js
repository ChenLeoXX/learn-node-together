const fs = require('fs');
const pathToRead = process.argv[2];
fs.readFile(pathToRead,(err,data) => {
   if (err) {
    throw err;
   } else {
      let lines = data.toString().split('\n');
      console.log(lines.length - 1);
   }
})