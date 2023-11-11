const input = require('fs')
.readFileSync('/dev/stdin')
.toString()
.split('\n');

const N = Number(input.shift());
const PList = input.map((e) => e.split(" ").map((e) => +e));
const evening = Array(N).fill(false);
let answer = Infinity;

const Calc = () => {
  let morningSum = (eveningSum = 0);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!evening[i] && !evening[j]) {
        morningSum += PList[i][j];
      }
      if (evening[i] && evening[j]) {
        eveningSum += PList[i][j];
      }
    }
  }

  return Math.abs(morningSum - eveningSum);
};

const findMin = (index, count) => {
  if (count === N / 2) {
    answer = Math.min(answer, Calc());
    return;
  }

  if (index === N) {
    return;
  }

  findMin(index + 1, count);
  evening[index] = true;
  findMin(index + 1, count + 1);
  evening[index] = false;
};

findMin(0, 0);
console.log(answer);