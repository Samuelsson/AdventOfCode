const fs = require('fs');
const inputs = fs.readFileSync(__dirname + '/inputs/day6').toString().split('\n');

function part1() {
    const gridSize = 500;
    let initialValues = [];
    const  x = new Array(gridSize);

    // Add y grid to each x grid
    for (let i = 0; i < x.length; i++) {
        x[i] = new Array(gridSize);
    }

    // Add the initial values to an object for be easier to use :)
    inputs.forEach((input, i) => {
        const values = input.match(/(\d*),\s(\d*)/);
        initialValues.push([Number(values[1]), Number(values[2])]);
    });

    addValueOfClosestArea(x, initialValues);
    const infiniteAreas = findInfiniteAreas(x);
    const largestArea = findLargestSize(x, infiniteAreas);

    console.log(`Part1: Largest area has a size of ${largestArea}.`);
}

part1();

function addValueOfClosestArea(x, initialValues) {
    // Start calculating from 0,0. All the way to 499,499 :O
    for (let ix = 0; ix < x.length; ix++) {
        for (let iy = 0; iy < x[ix].length; iy++) {
            x[ix][iy] = findAndSetClosestArea(ix, iy, initialValues);
        }
    }
}

function findAndSetClosestArea(x, y, initialValues) {
    const currentClosest = {};

    initialValues.forEach((val, i) => {
        let currentDistance = calculateDistance(x, y, val[0], val[1]);

        if (i === 0) {
            currentClosest.arrayIndex = i;
            currentClosest.distance = currentDistance;
        } else if (currentDistance === currentClosest.distance) {
            // Same distance for multiple areas, set index to an 'X'.
            currentClosest.arrayIndex = 'X';
            currentClosest.distance = currentDistance;
        } else if (currentDistance < currentClosest.distance) {
            currentClosest.arrayIndex = i;
            currentClosest.distance = currentDistance;
        }
    });

    return currentClosest.arrayIndex;
}

function calculateDistance(xOne, yOne, xTwo, yTwo) {
    return Math.abs(xOne - xTwo) + Math.abs(yOne - yTwo);
}

// Finding infinite areas by checking all outer values
function findInfiniteAreas(x) {
    let allValues = [];

    for (let i = 0; i < x.length; i++) {
        allValues.push(x[i][0]);
        allValues.push(x[i][x.length -1]);

        allValues.push(x[0][i]);
        allValues.push(x[x.length -1][i]);
    }

    return [...new Set(allValues)];
}

function findLargestSize(x, infiniteAreas) {
    const areas = {};
    let largestSize = 0;

    for (let ix = 0; ix < x.length; ix++) {
        for (let iy = 0; iy < x[ix].length; iy++) {
            const currentArea = x[ix][iy];

            if (currentArea !== 'X' && !infiniteAreas.includes(currentArea)) {
                areas[currentArea] = areas[currentArea] ? areas[currentArea] + 1 : 1;
            }
        }
    }

    for (let key in areas) {
        if (areas[key] > largestSize) {
            largestSize = areas[key];
        }
    }

    return largestSize;
}
