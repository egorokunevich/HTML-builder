const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');
fs.writeFile(path.join(__dirname, 'text.txt'), '', () => {
  stdout.write('Please, enter the data...\n');
});
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    stdin.destroy();
  } else {
    fs.appendFile(path.join(__dirname, 'text.txt'), data, () => {
      stdout.write(`Please, enter the data... (Ctrl+C or input 'exit' to stop the process)\n`);
    });
  }
});
stdin.on('close', () => {
  console.log('Process stopped.');
});
process.on('SIGINT', () => {
  console.log('Process stopped.');
  process.exit();
});