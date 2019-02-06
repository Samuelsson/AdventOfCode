const fs = require('fs');
const input = fs.readFileSync(__dirname + '/inputs/day5').toString();

function part1() {
    console.log('Part 1: ' + removeCharsAndGetLength(input));
}

function part2() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const charList = {};
    let shortestChar = {};

    alphabet.forEach((char) => {
        let testInput = input;
        const charUpper = char.toUpperCase();
        testInput = testInput.replace(new RegExp(char, "g"), '');
        testInput = testInput.replace(new RegExp(charUpper, "g"), '');

        charList[charUpper] = removeCharsAndGetLength(testInput);
    });

    for (let key in charList) {
        if (!shortestChar.character || charList[key] < shortestChar.theLength) {
            shortestChar.character = key;
            shortestChar.theLength = charList[key];
        }
    }

    console.log(`Part 2: The shortest char is ${shortestChar.character} with ${shortestChar.theLength}`);
}

part1();
part2();

function removeCharsAndGetLength(testInput) {
    let modified = true;

    while (modified) {
        for (let i = 0; i < testInput.length; i++) {
            if (testInput.charAt(i).toLowerCase() === testInput.charAt(i + 1).toLowerCase() &&
                testInput.charAt(i) !== testInput.charAt(i + 1)) {
                testInput = testInput.slice(0, i) + testInput.slice(i + 2);
                modified = true;
                break;
            } else {
                modified = false;
            }
        }
    }

    return testInput.length;
}
