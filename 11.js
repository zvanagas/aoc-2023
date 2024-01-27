import fs from 'fs';

const file = fs.readFileSync('./inputs/11.txt', 'utf-8');
const rows = file.split('\n');
const dotsLine = '.'.repeat(rows[0].length);
let galaxies = [];
let result = 0;

for (let i = 0; i < rows[0].length; i++) {
  let isEmpty = true;
  for (let j = 0; j < rows.length; j++) {
    if (rows[j][i] === '#' && isEmpty) {
      isEmpty = false;
    }
  }
  if (isEmpty) {
    for (let j = 0; j < rows.length; j++) {
      rows[j] = rows[j].substring(0, i) + '.' + rows[j].substring(i);
    }
    i++;
  }
}

for (let i = 0; i < rows.length; i++) {
  const galaxyIndex = rows[i].indexOf('#');
  if (galaxyIndex > -1) {
    const galaxyIndexes = rows[i].split('').map((value, index) => value === '#' ? [i, index] : '').filter(String);
    galaxies = galaxies.concat(galaxyIndexes)
    continue;
  }
  rows.splice(i, 0, dotsLine);
  i++;
}

for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    result += galaxies[j][0] - galaxies[i][0] + Math.abs(galaxies[j][1] - galaxies[i][1]);
  }
}

console.log(result);