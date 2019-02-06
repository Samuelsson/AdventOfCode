const fs = require('fs');
const inputs = fs.readFileSync(__dirname + '/inputs/day2').toString().split('\n');

function part1() {
    let twice = 0;
    let thrice = 0;

    inputs.forEach((input) => {
        const letterContainer = {};
        let twi = false;
        let thr = false;

        sortedArray = input.split('').sort();
        sortedArray.forEach((letter) => {
            letterContainer[letter] = letterContainer[letter] ? letterContainer[letter] + 1 : 1;
        });

        Object.values(letterContainer).forEach((val) => {
            if (val === 2) {
                twi = true;
            } else if (val === 3) {
                thr = true;
            }
        });

        if (twi) {
            twice++;
        }
        if (thr) {
            thrice++;
        }
    })
    
    console.log(twice * thrice);
}

part1();