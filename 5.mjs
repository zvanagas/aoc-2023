import fs from 'fs';

function getNextValue (conRow, value) {
  const [_, ...rows] = conRow.split('\n').map((it) => it.split(' ').map((n) => parseInt(n)));
  for (const [startingValue, min, steps] of rows) {
    const max = min + steps - 1;
    if (min <= value && value <= max) {
      const diff = value - min + startingValue;
      return diff;
    }
  }
  return value;
}

const file = fs.readFileSync('./inputs/5.txt', 'utf-8');
const [
  seedsRow,
  seedToSoilRow,
  soilToFertRow,
  fertToWaterRow,
  waterToLightRow,
  lightToTempRow,
  tempToHumRow,
  humToLocRow,
] = file.split('\n\n');
const seeds = seedsRow.replace('seeds: ', '').split(' ').map((n) => parseInt(n));
let lowestLoc;

for (const seed of seeds) {
  const soil = getNextValue(seedToSoilRow, Number(seed));
  const fert = getNextValue(soilToFertRow, soil);
  const water = getNextValue(fertToWaterRow, fert);
  const light = getNextValue(waterToLightRow, water);
  const temp = getNextValue(lightToTempRow, light);
  const hum = getNextValue(tempToHumRow, temp);
  const loc = getNextValue(humToLocRow, hum);
  if (!lowestLoc || loc < lowestLoc) {
    lowestLoc = loc;
  }
}

console.log(lowestLoc)
