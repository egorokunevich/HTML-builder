const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');
fs.writeFile(path.join(__dirname, 'text.txt'), '', () => {
  console.log('Created text.txt');
  stdout.write('Please, enter the data...\n');
});
stdin.on('data', (data) => {
  fs.appendFile(path.join(__dirname, 'text.txt'), data, () => {
    stdout.write('Please, enter the data... (or Ctrl+C to exit)\n');
  });
});
