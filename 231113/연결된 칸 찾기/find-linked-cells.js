// N*N 크기의 1과 0으로 이루어진 2차원 배열이 입력값으로 주어진다.
// 십자 방향으로 1의 숫자끼리 이루어지는 열이나 행이 있을 경우 연결되었다고 판단한다.
// 주어진 입력에서 모든 연결들을 찾아내고, 각 연결이 몇 개의 노드로 이루어졌는지 오름차순으로 출력한다.

// BFS 방식의 접근법:
// 이중 반복문으로 각 인덱스 값을 조회한다.
// 방문했던 좌표가 아니고, 인덱스 값이 1일 경우 BFS를 실행한다.

// BFS:
// 큐에 현재 좌표를 추가하고, 방문 기록을 남긴다.
// 연결 길이를 1로 초기화하고 1인 노드를 만날 때마다 1씩 추가한다.
// 큐의 크기가 0이 될때까지 반복문을 돌려 주변의 1을 탐색한다.
// 십자 방향으로 주변의 인덱스 중에 방문 한 적이 없고, 값이 1인 노드를 찾는다.
// 해당 노드를 큐에 삽입하고 방문기록을 남긴다.
// 반복문이 종료되면 연결 길이를 리턴한다.

// BFS가 끝나면 리턴된 값을 연결 리스트에 추가한다.
// 모든 노드를 조회한 후 리스트의 길이를 출력한다.
// 리스트의 정렬을 오름차순으로 맞추고, 각 길이를 하나씩 출력한다.


const input = require('fs')
.readFileSync('/dev/stdin')
.toString()
.split('\n');

const N = +input.shift();
const list = input.map((e) => e.split(" ").map((e) => +e));

const visited = Array(N)
  .fill(null)
  .map(() => Array(N).fill(false));
const connectList = [];

const BFS = (i, j) => {
  let count = 1;
  const queue = [[i, j]];
  visited[i][j] = true;

  while (queue.length > 0) {
    const [i, j] = queue.shift();

    const directions = [
      [i, j - 1],
      [i, j + 1],
      [i - 1, j],
      [i + 1, j],
    ];

    directions.forEach(([x, y]) => {
      if (x >= 0 && y >= 0 && x < N && y < N && visited[x][y] === false && list[x][y] === 1) {
        queue.push([x, y]);
        visited[x][y] = true;
        count++;
      }
    });
  }

  return count;
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j] === false && list[i][j] === 1) {
      connectList.push(BFS(i, j));
    }
  }
}

connectList.sort((a, b) => a - b);
console.log(connectList.length);
connectList.forEach((e) => console.log(e));