 const filterFn = require('./modular');
 filterFn(...process.argv.slice(2), function(err,data) {
    if (err) {
      throw err
    } else {
      data.forEach(file => {
        console.log(file);
      });
    }
 });