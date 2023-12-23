import fs from 'fs';

const file = fs.readFileSync('./inputs/6.txt', 'utf-8');
const [times, distances] = file.split('\n').map((it) => it.replace(/[a-zA-Z/]+:/g, '').trim().split(' ').filter(Boolean));

let result = 0;

for (let i = 0; i < times.length; i++) {
  let solutions = 0;
  const maxTime = Number(times[i]);
  for (let attempt = 0; attempt <= maxTime; attempt++) {
    const diff = maxTime - attempt;
    const travelDistance = attempt * diff;
    if (travelDistance > Number(distances[i])) {
      solutions += 1;
    }
  }
  if (solutions) {
    result = result ? result * solutions : solutions;
  }
}

console.log(result)