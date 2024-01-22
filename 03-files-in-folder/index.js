const fs = require('fs');
const path = require('path');
const secretPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretPath, (err, files) => {
  if (err) {
    throw new Error('Cannot read directory');
  }

  files.forEach((file) => {
    const currentPath = path.join(secretPath, file);

    fs.stat(currentPath, (err, stats) => {
      if (err) {
        throw new Error('Cannot read file');
      }

      if (!stats.isDirectory()) {
        const fileBaseName = path.parse(currentPath, file).name;
        const fileExtension = path.extname(currentPath, file);
        const fileSize = (stats.size / 1024).toFixed(2);

        process.stdout.write(
          `${fileBaseName} - ${fileExtension} - ${fileSize} KB\n`,
        );
      }
    });
  });
});
