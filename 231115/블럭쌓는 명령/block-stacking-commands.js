const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, K] = input.shift().split(" ").map((e) => +e);
const list = input.map((e) => e.split(" ").map((e) => +e));
const container = Array(N).fill(0);

for (let i = 0; i < K; i++) {
    const [A, B] = list[i];

    container[A]++;
    container[B + 1]--;
}

for (let i = 1; i < N + 1; i++) {
    container[i] += container[i - 1];
}

container.sort((a, b) => a - b);
const middle = container[Math.floor(N / 2)];
console.log(middle);