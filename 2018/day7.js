const fs = require('fs');
const inputs = fs.readFileSync(__dirname + '/inputs/day7').toString().split('\n');

const testInputs = `Step C must be finished before step A can begin.
                    Step C must be finished before step F can begin.
                    Step A must be finished before step B can begin.
                    Step A must be finished before step D can begin.
                    Step B must be finished before step E can begin.
                    Step D must be finished before step E can begin.
                    Step F must be finished before step E can begin.`.split('\n');

function part1() {
    testInputs.forEach((input) => {
        const matching = input.match(/Step\s([A-Z])\s.*\s([A-Z])\scan.*/);
        console.log(matching[1], matching[2]);
    })
}

part1();
