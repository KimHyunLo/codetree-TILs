const input = require("fs")
.readFileSync("/dev/stdin")
.toString()
.split("\n");

let answer = 0;
const N = +input.shift();
const arr = [...input].map(Number);
const visited = Array(N + 2).fill(false);

const indexArr = Array(N).fill(null).map(() => []);
const userSet = new Set([...arr].sort((a, b) => a - b));
const userMap = new Map();

let idx = 0;
for (let value of userSet.values()) {
    userMap.set(value, idx++);
}

for (let i = 0; i < N; i++){
    indexArr[userMap.get(arr[i])].push(i);
}

let result = 0;
for (let i = userSet.size - 1; i >= 0; i--) {
    for (let j = 0; j < indexArr[i].length; j++) {
        const current = indexArr[i][j];

        if (!visited[current - 1] && !visited[current + 1]) {
            result++;
        } else if (visited[current - 1] && visited[current + 1]) {
            result--;
        }

        visited[current] = true;
    }

    answer = Math.max(answer, result);
}

console.log(answer);