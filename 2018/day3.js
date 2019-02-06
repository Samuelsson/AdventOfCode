const fs = require('fs');
const inputs = fs.readFileSync(__dirname + '/inputs/day3').toString().split('\n');

const grid = {}

function part1() {
    let duplicates = 0;

    inputs.forEach((input) => {
        let values = input.match(/#[\d]*\s@\s([\d]*),([\d]*):\s([\d]*)x([\d]*)/);

        let xAxis = values[1];
        let yAxis = values[2];
        let xAmount = values[3];
        let yAmount = values[4];

        // Looping over each row nested with the loops over columns
        for (let yLoop = 0; yLoop < xAmount; yLoop++) {
            for (let xLoop = 0; xLoop < yAmount; xLoop++) {
                let currentAxisX = Number(xAxis) + Number(yLoop);
                let currentAxisY = Number(yAxis) + Number(xLoop);

                addToGrid(grid, currentAxisX, currentAxisY);
            }
        }
    });

    function addToGrid(grid, x, y) {
        grid[x] = grid[x] || {};

        if (grid[x][y]) {
            grid[x][y]++;

            // Only add dupliactes once
            if (grid[x][y] === 2) {
                duplicates++;
            }
        } else {
            grid[x][y] = 1;
        }
    }

    console.log(duplicates);
}

function part2() {
    inputs.forEach((input) => {
        let values = input.match(/#[\d]*\s@\s([\d]*),([\d]*):\s([\d]*)x([\d]*)/);
        let isAlone = true;

        let xAxis = values[1];
        let yAxis = values[2];
        let xAmount = values[3];
        let yAmount = values[4];

        // Looping over each row nested with the loops over columns
        for (let yLoop = 0; yLoop < xAmount; yLoop++) {
            for (let xLoop = 0; xLoop < yAmount; xLoop++) {
                let currentAxisX = Number(xAxis) + Number(yLoop);
                let currentAxisY = Number(yAxis) + Number(xLoop);

                if (grid[currentAxisX][currentAxisY] > 1) {
                    isAlone = false;
                    break;
                }
            }

            if (!isAlone) {
                break;
            }
        }

        if (isAlone) {
            console.log(values[0]);
        }
    });
}

part1();
part2();