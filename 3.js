import fs from 'fs';

const file = fs.readFileSync('./inputs/3.txt', 'utf-8');
const lines = file.split('\n');

let result = 0;

for (let i = 0; i < lines.length; i++) {
  let currentNumber = '';
  const symbolsCount = lines[i].length;
  for (let l = 0; l < symbolsCount; l++) {
    const isNumber = !isNaN(lines[i][l]);
    const isNextNumber = !isNaN(lines[i][l + 1]);
    if (isNumber) {
      currentNumber += lines[i][l];
    }
    if (currentNumber && (!isNextNumber || l + 1 === symbolsCount)) {
      let isValidNumber = false;
      if (l - currentNumber.length >= 0) {
        if (lines[i][l - currentNumber.length]?.match(/[^.a-zA-Z0-9]/)?.length) {
          isValidNumber = true;
          result += Number(currentNumber);
        }
        console.log(currentNumber, 'Left check', isValidNumber, lines[i][l - currentNumber.length]);
      }
      if (!isValidNumber && l + 1 < symbolsCount) {
        if (lines[i][l + 1]?.match(/[^.a-zA-Z0-9]/)?.length) {
          isValidNumber = true;
          result += Number(currentNumber);
        }
        console.log(currentNumber, 'Right check', isValidNumber, lines[i][l + 1]);
      }
      if (!isValidNumber && i - 1 >= 0) {
        const sliced = lines[i - 1].slice(l - currentNumber.length < 0 ? 0 : l - currentNumber.length, l + 2);
        if (sliced?.match(/[^.a-zA-Z0-9]/)?.length) {
          isValidNumber = true;
          result += Number(currentNumber);
        }
        console.log(currentNumber, 'Upper check', isValidNumber, sliced);
      }
      if (!isValidNumber && i + 1 < lines.length) {
        const sliced = lines[i + 1].slice(l - currentNumber.length < 0 ? 0 : l - currentNumber.length, l + 2);
        if (sliced?.match(/[^.a-zA-Z0-9]/)?.length) {
          isValidNumber = true;
          result += Number(currentNumber);
        }

        console.log(currentNumber, 'Bottom check', isValidNumber, sliced);
      }
      currentNumber = '';
    }
  }
}

console.log(result);