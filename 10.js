import fs from 'fs';

const file = fs.readFileSync('./inputs/10.txt', 'utf-8');
const rows = file.split('\n');

const rowsCount = rows.length;
const colsCount = rows[0].length;

let result = 0;
let isRunning = true;
const startingLocation = getStartPosition();
const possibleStarts = getPossibleStarts(startingLocation);
let currentPos = [...possibleStarts[0]];

while (isRunning) {
  result++;
  const [row, col, direction] = currentPos;
  if (rows[row][col] === 'S') {
    isRunning = false;
    continue;
  }

  if (direction === 'up') {
    switch (rows[row][col]) {
      case 'F': {
        currentPos = [row, col + 1, 'right'];
        break;
      }
      case '7': {
        currentPos = [row, col - 1, 'left'];
        break;
      }
      case '|': {
        currentPos = [row - 1, col, 'up'];
      }
    }
  } else if (direction === 'down') {
    switch (rows[row][col]) {
      case 'L': {
        currentPos = [row, col + 1, 'right'];
        break;
      }
      case 'J': {
        currentPos = [row, col - 1, 'left'];
        break;
      }
      case '|': {
        currentPos = [row + 1, col, 'down'];
      }
    }
  } else if (direction === 'left') {
    switch (rows[row][col]) {
      case 'L': {
        currentPos = [row - 1, col, 'up'];
        break;
      }
      case '-': {
        currentPos = [row, col - 1, 'left'];
        break;
      }
      case 'F': {
        currentPos = [row + 1, col, 'down'];
      }
    }
  } else if (direction === 'right') {
    switch (rows[row][col]) {
      case 'J': {
        currentPos = [row - 1, col, 'up'];
        break;
      }
      case '-': {
        currentPos = [row, col + 1, 'right'];
        break;
      }
      case '7': {
        currentPos = [row + 1, col, 'down'];
      }
    }
  }
}

function getStartPosition () {
  for (let r = 0; r < rowsCount; r++) {
    for (let c = 0; c < colsCount; c++) {
      if (rows[r][c] !== 'S') {
        continue;
      }
  
      return [r, c];
    }
  }
}

function getPossibleStarts (sLocation) {
  const startingPositions = [];

  if (['F', '7', '|'].includes(rows[sLocation[0] - 1][sLocation[1]])) {
    startingPositions.push([sLocation[0] - 1, sLocation[1], 'up']);
  }
  if (['J', 'L', '|'].includes(rows[sLocation[0] + 1][sLocation[1]])) {
    startingPositions.push([sLocation[0] + 1, sLocation[1], 'down']);
  }
  if (['F', 'L', '-'].includes(rows[sLocation[0]][sLocation[1] - 1])) {
    startingPositions.push([sLocation[0], sLocation[1] - 1, 'left']);
  }
  if (['7', 'J', '-'].includes(rows[sLocation[0]][sLocation[1] + 1])) {
    startingPositions.push([sLocation[0], sLocation[1] + 1, 'right']);
  }

  return startingPositions;
}

console.log(Math.floor(result / 2));
