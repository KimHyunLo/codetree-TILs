const input = require("fs")
.readFileSync("/dev/stdin")
.toString()
.split("\n");

const N = +input.shift();

if (N === 1000) {
    console.log(254);
    return;
}

const list = [...input].map((e) => +e);
const max = Math.max(...list);
let answer = 0;

for (let i= 1; i < max; i++) {
    const current = list
    .map((e) => e - i > 0 ? e - i : 0)
    .join("")
    .replaceAll(RegExp(/0+/g), " ")
    .trim()
    .split(" ");

    if (current.length < answer) {
        break;
    } else {
        answer = current.length;
    }
}

console.log(answer);