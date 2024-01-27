import fs from 'fs';

const file = fs.readFileSync('./inputs/12.txt', 'utf-8');
const rows = file.split('\n');

function countValidArrangements(row, groups) {
  function isValidCombination(combination) {
    let tempLine = combination + '.';
    for (const group of groups) {
      const item = Array(Number(group)).fill('#').join('') + '.';
      const firstSymbol = tempLine.indexOf('#');
      if (tempLine.substring(firstSymbol, firstSymbol + item.length) === item) {
        tempLine = tempLine.substring(firstSymbol + item.length);
      } else {
        return false;
      }
    }
    return tempLine.indexOf('#') < 0;
  }

  function generateCombinationsHelper(index, currentCombination) {
    if (index === row.length) {
      if (isValidCombination(currentCombination)) {
        result++;
      }
      return;
    }

    if (row[index] === '?') {
      generateCombinationsHelper(index + 1, currentCombination + '#');
      generateCombinationsHelper(index + 1, currentCombination + '.');
    } else {
      generateCombinationsHelper(index + 1, currentCombination + row[index]);
    }
  }

  let result = 0;
  generateCombinationsHelper(0, '');

  return result;
}

let result = 0;

for (const row of rows) {
  const [damagedRecords, separatedGroups] = row.split(' ');
  const groups = separatedGroups.split(',');
  result += countValidArrangements(damagedRecords, groups);
}

console.log(result);