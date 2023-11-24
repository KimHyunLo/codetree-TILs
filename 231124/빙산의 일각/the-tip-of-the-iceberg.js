const input = require("fs")
.readFileSync("/dev/stdin")
.toString()
.split("\n");

let answer = 0;
const N = +input.shift();

const arr = Array(N + 2).fill(null);
const visited = Array(N + 2).fill(false);

const userSet = new Set();
for (let i = 0; i < N; i++) {
    arr[i] = +input.shift();
    userSet.add(arr[i]);
}

const indexArr = Array(userSet.size).fill(null).map(() => []);
for (let i = 0; i < N; i++){
    indexArr[arr[i] - 1].push(i + 1);
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