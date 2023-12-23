import fs from 'fs';

const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;

let result = 0;

const file = fs.readFileSync('./inputs/2.txt', 'utf-8');
const games = file.split('\n');

for (const game of games) {
  let isPossible = true;
  const gameNo = game.match(/Game \d+/)?.[0].split(' ')[1];
  const rounds = game.split('; ');
  for (const round of rounds) {
    const red = parseInt(round.match(/\d+ red/)?.[0].split(' ')[0]) ?? 0;
    const green = parseInt(round.match(/\d+ green/)?.[0].split(' ')[0]) ?? 0;
    const blue = parseInt(round.match(/\d+ blue/)?.[0].split(' ')[0]) ?? 0;
    if (red > redCubes || green > greenCubes || blue > blueCubes) {
      isPossible = false;
      break;
    }
  }
  if (isPossible) {
    result += Number(gameNo);
  }
}

console.log(result);