import fs from 'fs';

const file = fs.readFileSync('./inputs/4.txt', 'utf-8');
const cards = file.split('\n');

let result = 0;

for (const card of cards) {
  let cardValue = 0;

  const [luckyNumbers, cardNumbers] = card.split(': ')[1].split(' | ');
  const luckyNum = luckyNumbers.split(' ').filter(Boolean).map((it) => parseInt(it));
  const cardNum = cardNumbers.split(' ').filter(Boolean).map((it) => parseInt(it));
  for (const number of luckyNum) {
    if (cardNum.includes(number)) {
      cardValue = cardValue > 0 ? cardValue * 2 : 1;
    }
  }
  result += cardValue;
}

console.log(result);
