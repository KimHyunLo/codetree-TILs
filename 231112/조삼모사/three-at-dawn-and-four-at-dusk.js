// 숫자들로 이루어진 2차원 배열이 입력값으로 들어온다.
// 

































const input = require('fs')
.readFileSync('/dev/stdin')
.toString()
.split('\n');

const N = Number(input.shift());
const PList = input.map((e) => e.split(" ").map((e) => +e));
let answer = Infinity;

const factorial = (num) => {
  let fact = 1;
  for (let i = num; i > 1; i--) {
    fact *= i;
  }

  return fact;
};

const calcWork = (i, j) => {
  return PList[i - 1][j - 1] + PList[j - 1][i - 1];
};

const findOpposit = (list) => {
  const opposit = [];

  for (let i = 0; i < N; i++) {
    if (list.includes(i + 1)) {
      continue;
    }

    opposit.push(i + 1);
  }

  return opposit;
};

const maxLoop = factorial(N) / (factorial(N / 2) * factorial(N / 2)) / 2;
let probList = Array(N / 2)
  .fill(null)
  .map((_, i) => {
    return { num: N - i, min: N / 2 - i };
  });

for (let i = 0; i < maxLoop; i++) {
  const current = probList.map((e) => e.num);
  const opposit = findOpposit(current);

  let morning = 0;
  let eveining = 0;

  for (let j = 0; j < current.length; j++) {
    for (let k = j + 1; k < current.length; k++) {
      morning += calcWork(current[j], current[k]);
      eveining += calcWork(opposit[j], opposit[k]);
    }
  }

  const work = Math.abs(morning - eveining);
  answer = Math.min(answer, work);

  if (probList.at(-1).num === probList.at(-1).min) {
    const changeIndex = probList.findIndex((e) => e.num === e.min) - 1;
    let changeNum = --probList[changeIndex].num;

    probList = probList.map((e, i) => {
      if (i > changeIndex) {
        return { ...e, num: --changeNum };
      } else {
        return e;
      }
    });
  } else {
    probList.at(-1).num--;
  }
}

console.log(answer);