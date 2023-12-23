import fs from 'fs';

const file = fs.readFileSync('./inputs/9.txt', 'utf-8');
const rows = file.split('\n').map((row) => row.split(' ').map((num) => parseInt(num)));

let result = 0;

for (const row of rows) {
  let lines = [[...row]];
  let i = 0;
  let hasFinished = false;

  while (!hasFinished) {
    for (let j = 0; j < lines[i].length - 1; j++) {
      const diff = lines[i][j + 1] - lines[i][j];
      lines[i + 1] ? lines[i + 1].push(diff) : lines[i + 1] = [diff];
    }
    i++;
    if (lines[lines.length - 1].every((val) => val === 0)) {
      hasFinished = true;
    }
  }
  
  const reversedList = lines.reverse().slice(1);
  
  for (let k = 0; k < reversedList.length; k++) {
    const currLastNumber = reversedList[k][reversedList[k].length - 1];
    if (!reversedList[k + 1]) {
      result += reversedList[k][reversedList[k].length - 1];
      continue;
    }
    const nextNumber = reversedList[k + 1][reversedList[k + 1].length - 1] + currLastNumber;
    
    reversedList[k + 1].push(nextNumber);
  }
}

console.log(result);
