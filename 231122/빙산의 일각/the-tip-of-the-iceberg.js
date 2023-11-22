const input = require("fs")
.readFileSync("/dev/stdin")
.toString()
.split("\n");

const N = +input.shift();
const list = [...input].map((e) => +e);
const max = Math.max(...list);
let answer = 0;

for (let i= 1; i < max; i++) {
    const current = list
    .map((e) => e - i <= 0 ? 0 : e - i)
    .join("")
    .split("0")
    .filter((e) => e !== "");

    if (current.length < answer) {
        break;
    } else {
        answer = current.length;
    }
}

console.log(answer);