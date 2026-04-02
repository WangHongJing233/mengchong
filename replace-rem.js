const fs = require('fs');

function findScssFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = dir + '/' + file;
    if (fs.statSync(filePath).isDirectory()) {
      findScssFiles(filePath, fileList);
    } else if (filePath.endsWith('.scss')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const scssFiles = findScssFiles('./src');

scssFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/([+-]?\d*\.?\d+)rem/g, (match, p1) => {
    const pxValue = parseFloat(p1) * 16;
    return pxValue + 'px';
  });
  fs.writeFileSync(file, content, 'utf-8');
});
console.log('Replaced rem with px in ' + scssFiles.length + ' files.');