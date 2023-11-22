const input = require("fs")
.readFileSync("/dev/stdin")
.toString()
.split("\n");

const N = +input.shift();
const list = [...input].map((e) => +e);
const max = Math.max(...list);
const min = Math.min(...list);
let answer = 0;

for (let i= max; i > min; i--) {
    const current = list
    .map((e) => e - i > 0 ? e - i : "s")
    .join("")
    .replaceAll(RegExp(/s+/g), " ")
    .trim()
    .split(" ");

    if (current.length < answer) {
        break;
    } else {
        answer = current.length;
    }
}

console.log(answer);