const fs = require('fs');
const path = require('path');
const pathOriginal = path.join(__dirname, 'files');
const pathCopy = path.join(__dirname, 'files-copy');

fs.rm(pathCopy, { recursive: true, force: true }, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log('Copied directory deleted...');
    fs.cp(pathOriginal, pathCopy, { recursive: true, force: true }, (err) => {
      if (err) {
        throw new Error(err);
      } else {
        fs.rm;
        console.log('Original directory copied.');
      }
    });
  }
});
