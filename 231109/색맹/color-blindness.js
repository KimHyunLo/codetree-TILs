let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const n = Number(input.shift());

const visited = Array(n)
  .fill(null)
  .map(() => Array(n).fill(false));
let rgbCount = rbCount = 0;

const BFS = (colors, x, y) => {
  visited[x][y] = true;
  const queue = [{ x, y }];

  while (queue.length > 0) {
    const { x, y } = queue.shift();

    const direction = [
      { x2: x, y2: y - 1 },
      { x2: x, y2: y + 1 },
      { x2: x - 1, y2: y },
      { x2: x + 1, y2: y },
    ];

    direction.forEach(({ x2, y2 }) => {
      if (x2 >= 0 && x2 < n && y2 >= 0 && y2 < n && visited[x2][y2] === false && colors[x][y] === colors[x2][y2]) {
        visited[x2][y2] = true;
        queue.push({ x: x2, y: y2 });
      }
    });
  }
};

const RGB = input.map((e) => e.split(""));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (visited[i][j] === false) {
      BFS(RGB, i, j);
      rgbCount++;
    }
  }
}

visited.forEach((e) => e.fill(false));

const RB = RGB.map((e) => e.map((e) => (e === "G" ? "R" : e)));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (visited[i][j] === false) {
      BFS(RB, i, j);
      rbCount++;
    }
  }
}

console.log(rgbCount, rbCount);