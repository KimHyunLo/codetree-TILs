const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const n = Number(input.shift());
const RGB = input.map((e) => e.split(""));
const RB = RGB.map((e) => e.map((e) => (e === "G" ? "R" : e)));

const BFS = (colors) => {
  const numbers = Array(n)
    .fill(null)
    .map(() => Array(n).fill(1));
  const visited = Array(n)
    .fill(null)
    .map(() => Array(n).fill(false));
  const queue = [{ x: 0, y: 0 }];

  while (queue.length > 0) {
    const { x, y } = queue.shift();

    if (visited[x][y] === true) {
      continue;
    } else {
      visited[x][y] = true;
    }

    const direction = [
      { x2: x, y2: y - 1 },
      { x2: x, y2: y + 1 },
      { x2: x - 1, y2: y },
      { x2: x + 1, y2: y },
    ];

    direction.forEach(({ x2, y2 }) => {
      if (x2 >= 0 && x2 < n && y2 >= 0 && y2 < n && visited[x2][y2] === false) {
        if (colors[x][y] !== colors[x2][y2]) {
          numbers[x2][y2] = numbers[x][y] + 1;
        } else {
          numbers[x2][y2] = numbers[x][y];
        }

        queue.push({ x: x2, y: y2 });
      }
    });
  }

  return Math.max(...numbers.map((e) => Math.max(...e)));
};

const rgbCount = BFS(RGB);
const rbCount = BFS(RB);
console.log(rgbCount, rbCount);