import fs from 'fs';

const file = fs.readFileSync('./inputs/8.txt', 'utf-8');
const [directions, unsplittedRows] = file.split('\n\n');
const rows = unsplittedRows.split('\n').reduce((prev, curr) => {
  const [key, pathString] = curr.split(' = ');
  const path = pathString.match(/[A-Z]{3}/g);
  prev[key] = { L: path[0], R: path[1] };

  return prev;
}, {});

let result = 0;
let current = 'AAA';
while (current !== 'ZZZ') {
  for (const moveDirection of directions) {
    current = rows[current][moveDirection];
    result++;
    if (current === 'ZZZ') {
      break;
    }
  }
}

console.log(result);

