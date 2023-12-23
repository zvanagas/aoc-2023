import fs from 'fs';

const file = fs.readFileSync('./inputs/1.txt', 'utf-8');
const clearedFile = file.replace(/[a-z]/gi, '');
const lines = clearedFile.split('\n');
let result = 0;

for (const line of lines) {
  const numbers = line[0] + line[line.length - 1];
  result += Number(numbers);
}

console.log(result);