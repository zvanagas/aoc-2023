import fs from 'fs';

const values = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };

const file = fs.readFileSync('./inputs/7.txt', 'utf-8');
const rows = file.split('\n');

const handKeys = rows.map((it) => it.split(' ')).reduce((prev, curr) => {
  prev[curr[0]] = curr[1];
  return prev;
}, {});
const hands = Object.keys(handKeys);

function getHandScore(hand) {
  const dic = {};
  for (const card of hand) {
    if (!dic[card]) {
      dic[card] = 1;
      continue;
    }

    dic[card] += 1;
  }
  const res = Object.entries(dic).sort((a, b) => b[1] - a[1]);

  if (res[0][1] === 5) {
    return 7;
  } else if (res[0][1] === 4) {
    return 6;
  } else if (res[0][1] === 3 && res[1][1] === 2) {
    return 5;
  } else if (res[0][1] === 3) {
    return 4;
  } else if (res[0][1] === 2 && res[1][1] === 2) {
    return 3;
  } else if (res[0][1] === 2) {
    return 2;
  }
  return 1;
}

for (let i = 0; i < hands.length; i++) {
  for (let j = 0; j < (hands.length - i - 1); j++) {
    const leftHand = getHandScore(hands[j]);
    const rightHand = getHandScore(hands[j + 1]);
    if (leftHand > rightHand) {
      const temp = hands[j];
      hands[j] = hands[j + 1];
      hands[j + 1] = temp;
    } else if (leftHand === rightHand) {
      for (let c = 0; c < 5; c++) {
        const leftHandScore = values[hands[j][c]];
        const rightHandScore = values[hands[j + 1][c]];
        if (leftHandScore < rightHandScore) {
          break;
        }

        if (leftHandScore > rightHandScore) {
          const temp = hands[j];
          hands[j] = hands[j + 1];
          hands[j + 1] = temp;
          break;
        }

        
      }
    }
  }
}

let result = 0;

for (let i = 1; i <= hands.length; i++) {
  result += handKeys[hands[i - 1]] * i;
}

console.log(result);

