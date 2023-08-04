const fs = require('fs');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:`);
      console.error(err.message);
    } else {
      console.log(data);
    }
  });
}

const filePath = process.argv[2];
if (filePath) {
  cat(filePath);
} else {
  console.error('Please provide the path to the file as a command-line argument.');
}
