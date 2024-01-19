const { stdout } = process;
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const fs = require('fs');
const stream = fs.createReadStream(filePath, 'utf-8');
stream.on('data', (data) => {
  stdout.write(data);
});
