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
        process.stdout.write(
          `File: ${path
            .parse(currentPath, file)
            .name.padEnd(6)} | extension: ${path
            .extname(currentPath, file)
            .padEnd(5)} | size: ${Math.ceil(stats.size / 1024)} KB\n`,
        );
      }
    });
  });
});
