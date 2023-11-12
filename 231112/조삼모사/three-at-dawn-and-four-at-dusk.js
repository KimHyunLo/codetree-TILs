// 하루에 해야하는 일 N과 업무 상성을 나타내는 2차원 배열이 입력값으로 들어온다.
// 업무를 아침과 저녁으로 N/2씩 동등하게 분배해서 각 업무별 강도를 계산한다.
// 업무 강도는 P(i, j) = Work(i, j) + Work(j, i) 공식으로 구한다.
// N/2로 나누어서 구할 수 있는 모든 아침&저녁 업무량을 계산하고,
// 그 중 아침과 저녁의 업무량 차이가 가장 적은 값을 찾는다.

// 확률의 수:
// 아침-저녁으로 나눌 수 있는 모든 경우의 수를 구한다.
// N개에서 M개 뽑기 공식: N!/(N-M)!*M!
// 현재 구하고 싶은 확률인 N개의 업무중 N/2을 확인한다.
// [1, 2, 3]과 [3, 2, 1]의 업무량은 같기 때문에 하나의 업무로 본다.
// 구할 수 있는 총 확률의 수: N!/((N/2)!^2)*2

// 반복문을 돌리기 위해서 N부터 N/2까지의 숫자로 업무 리스트를 생성한다.
// 각 숫자는 min값을 가지며, 숫자는 min값 이하로 내려가지 않는다.

// 업무량 차이 계산:
// 모든 확률을 구할 때까지 반복문을 돌린다.
// 현재 업무 리스트를 아침과 저녁으로 나눈다.
// ex) N=6: 123-456
// 각 인덱스별로 2개씩 뽑아 업무강도를 구하고 아침일과 저녁일의 총 합을 구한다.
// ex) [1, 2, 3, 4]: 12, 13, 14, 23, 24, 34
// 아침 업무량과 저녁 업무량의 차이를 구하고, 기존 차잇값과 대조해 최솟값을 택한다.

// 업무량 차이를 구한 후 다음 확률을 구하기 위해 업무 리스트를 갱신한다.
// 1. 가장 마지막 인덱스의 숫자가 자신의 min값과 같을 경우
// 뒤에서부터 대조하여 자신의 min값보다 큰 숫자의 인덱스를 찾는다.
// 찾은 인덱스의 숫자를 1 차감하고, 뒤의 숫자들을 1씩 감소하는 형태로 초기화한다.
// ex) [8, 7, 2, 1] => [8, 6, 5, 4]
// 2. 가장 마지막 인덱스의 숫자가 자신의 min값보다 클 경우
// 마지막 인덱스를 1 차감하고 다음 확률을 구한다.

// 모든 확률을 구한 뒤 아침-저녁 업무량 차이의 최솟값을 리턴한다.

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