const fs = require('fs');
const path = require('path');
const stylesPath = path.join(__dirname, 'styles');
const stylesBundlePath = path.join(__dirname, 'project-dist');
let arr = [];
fs.readdir(stylesPath, (err, files) => {
  if (err) {
    throw new Error('Cannot read directory');
  }
  files.forEach((file) => {
    const currentPath = path.join(stylesPath, file);

    fs.stat(currentPath, (err, stats) => {
      if (err) {
        throw new Error('Cannot read file');
      }

      const fileExtension = path.extname(currentPath, file);

      if (stats.isFile() && fileExtension === '.css') {
        const stream = fs.createReadStream(currentPath, 'utf-8');
        stream.on('data', (data) => {
          arr.push(data);
        });
      }
    });
  });
  fs.writeFile(path.join(stylesBundlePath, 'bundle.css'), '', () => {
    arr.forEach((item) => {
      fs.appendFile(path.join(stylesBundlePath, 'bundle.css'), item, () => {});
    });
  });
});
