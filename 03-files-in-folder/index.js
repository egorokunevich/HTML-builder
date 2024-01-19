const fs = require('fs');
const path = require('path');
const secretPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretPath, (err, files) => {
  err ? console.log(err) : null;
  files.forEach((file) => {
    const currentPath = path.join(secretPath, file);

    fs.stat(currentPath, (err, stats) => {
      err ? console.log(err) : null;

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
