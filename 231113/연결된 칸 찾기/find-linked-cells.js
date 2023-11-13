const input = require('fs')
.readFileSync('/dev/stdin')
.toString()
.split('\n');

const N = +input.shift();
const list = input.map((e) => e.split(" ").map((e) => +e));

const visited = Array(N).fill(null).map(() => Array(N).fill(false));
const connectList = [];

const BFS = (i, j) => {
    let count = 0;
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

        directions.forEach((dir) => {
            const x = dir[0];
            const y = dir[1];

            if (x >= 0 && y >= 0 && x < N && y < N && visited[x][y] === false && list[x][y] === 1) {
                queue.push([x, y]);
                visited[x][y] = true;
                count++;
            }
        })
    }

    return count;
} 

for (let i=0; i<N; i++) {
    for (let j=0; j<N; j++) {
        if (visited[i][j] === false) {
            const result = BFS(i, j);

            if (result !== 0) {
                connectList.push(result);
            }
        }
    }
}

connectList.sort((a, b) => a - b);
console.log(connectList.length);
connectList.forEach((e) => console.log(e));