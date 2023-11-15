const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, K] = input.shift().split(" ").map((e) => +e);
const list = input.map((e) => e.split(" ").map((e) => +e));
const container = Array(N).fill(0);

for (let i = 0; i < K; i++) {
    const [A, B] = list[i];

    for (let j = A - 1; j < B; j++) {
        container[j]++;
    }
}

container.sort((a, b) => a - b);
const middle = container[Math.floor(N / 2)];
console.log(middle);