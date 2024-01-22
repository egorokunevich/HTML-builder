// const { stdin, stdout } = process;
const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');
const projectDistPath = path.join(__dirname, 'project-dist');
const componentPath = path.join(__dirname, 'components');

//Create 'project-dist' directory
fs.mkdir(projectDistPath, { recursive: true }, async (err) => {
  if (err) {
    throw new Error(err);
  }

  let templateString = await fsPromise.readFile(
    path.join(__dirname, 'template.html'),
    {
      encoding: 'utf-8',
    },
  );
  const templateArray = templateString.split(/\{{([^}]+)\}}/);
  const indexesToAppend = [];
  const componentsArray = await fsPromise.readdir(componentPath);
  const promisesArray = await Promise.all(
    componentsArray.map(async (file) => {
      const filePath = path.join(componentPath, file);
      const fileBaseName = path.parse(filePath, file).name;
      const indexToAppend = templateArray.findIndex((item, index) => {
        if (item === fileBaseName) {
          return index;
        }
      });
      indexesToAppend.push(indexToAppend);

      return await fsPromise.readFile(filePath, { encoding: 'utf-8' });
    }),
  );
  componentsArray.forEach((item, index) => {
    const i = indexesToAppend[index];
    templateArray[i] = promisesArray[index];
  });
  templateString = templateArray.join('');

  //Create index.html
  fs.writeFile(
    path.join(projectDistPath, 'index.html'),
    templateString,
    () => {},
  );
});

//Create styles.css
const stylesPath = path.join(__dirname, 'styles');
const stylesBundlePath = path.join(__dirname, 'project-dist');
// let arr = [];
fs.readdir(stylesPath, async (err, files) => {
  if (err) {
    throw new Error('Cannot read directory');
  }

  const stylesArray = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(stylesPath, file);

      return await fsPromise.readFile(filePath, { encoding: 'utf-8' });
    }),
  );
  fs.writeFile(path.join(stylesBundlePath, 'style.css'), '', () => {
    stylesArray.forEach((item) => {
      fs.appendFile(path.join(stylesBundlePath, 'style.css'), item, () => {});
    });
  });
});

//Copy assets
const assetsOriginalPath = path.join(__dirname, 'assets');
const assetsCopyPath = path.join(__dirname, 'project-dist', 'assets');
fs.rm(assetsCopyPath, { recursive: true, force: true }, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    fs.cp(
      assetsOriginalPath,
      assetsCopyPath,
      { recursive: true, force: true },
      (err) => {
        if (err) {
          throw new Error(err);
        }
      },
    );
  }
});
