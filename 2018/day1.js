const fs = require('fs');
const inputs = fs.readFileSync(__dirname + '/inputs/day1').toString().split('\n').map(input => Number(input));

function part1() {
    const sum = inputs.reduce((a, b) => a + b, 0);
    console.log(sum);
}

part1();
