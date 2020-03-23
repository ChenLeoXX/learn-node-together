/**
 *   Create a program that prints a list of files in a given directory,  
  filtered by the extension of the files. You will be provided a directory  
  name as the first argument to your program (e.g. '/path/to/dir/') and a  
  file extension to filter by as the second argument.  
   
  For example, if you get 'txt' as the second argument then you will need to  
  filter the list to only files that end with .txt. Note that the second  
  argument will not come prefixed with a '.'.  
 */
const fs = require('fs');
const path = require('path');
const pathToRead = process.argv[2];
const targetExt = process.argv[3];
fs.readdir(pathToRead,(err,files) => {
  if (err) {
    throw err
  } else {
    files.forEach(file => {
      if (path.extname(file) === `.${targetExt}`) {
        console.log(file);
      }
    })
  }
});