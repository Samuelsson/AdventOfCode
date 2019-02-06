const fs = require('fs');
const inputs = fs.readFileSync(__dirname + '/inputs/day4').toString().split('\n');

function part1() {
    const sortedInput = sortInputByDate(inputs);
    const splittedInput = splitAndGroupGuardsPerDay(sortedInput);
    const calculatedInput = calculateSleepMinutes(splittedInput);

    findTheSleepiestGuardMinute(calculatedInput);
}

function part2() {
    const sortedInput = sortInputByDate(inputs);
    const splittedInput = splitAndGroupGuardsPerDay(sortedInput);
    const calculatedInput = calculateSleepMinutes(splittedInput);

    findTheMostFrequentMinute(calculatedInput);
}

part1();
part2();

function sortInputByDate(inputs) {
    return inputs.sort((a, b) => {
        const aa = a.match(/\[(\d*-\d*-\d*)\s(\d*:\d*)\]\s(.*)/);
        const bb = b.match(/\[(\d*-\d*-\d*)\s(\d*:\d*)\]\s(.*)/);
        
        return new Date(`${aa[1]}T${aa[2]}:00Z`) - new Date(`${bb[1]}T${bb[2]}:00Z`)
    });
}

function splitAndGroupGuardsPerDay(inputs) {
    const daysGrouped = [];
    let tempObj = {};
    inputs.forEach((input, i) => {
        // This is a new day
        if (input.match(/Guard\s#/)) {
            if (i > 0) {
                daysGrouped.push(tempObj);
            }
            tempObj = {
                guard: input.match(/\[\d*-\d*-\d*\s\d*:\d*\]\sGuard\s#(\d*)/)[1],
                times: []
            };
        } else {
            tempObj.times.push(input);
        }
    });
    
    return daysGrouped;
}

function calculateSleepMinutes(days) {
    const guards = {};

    days.forEach((day) => {
        let sleepTime = 0;
        let stateMinutes = [];
        let guardSleepMinutes = {};

        day.times.forEach(time => {
            const state = time.match(/\[\d*-\d*-\d*\s\d*:(\d*)\]\s(.*)/);
            stateMinutes.push(Number(state[1]));
        });

        // Creating an entry for each minute - if guard is sleeping or not
        let currentMin = 00;
        let awake = true;
        while (currentMin < 60) {

            // Toggle sleep/awake
            if (stateMinutes.includes(currentMin)) {
                awake = !awake;
            }

            // Add to total sleep time
            if (!awake) {
                guardSleepMinutes[currentMin] = 1;
                sleepTime++
            } else {
                guardSleepMinutes[currentMin] = 0;
            }

            currentMin++;
        }

        if (guards[day.guard]) {
            for (var min in guards[day.guard].pattern) {
                guards[day.guard].pattern[min] += guardSleepMinutes[min];
            }
            guards[day.guard].totalSleepTime += sleepTime;
        } else {
            guards[day.guard] = {};
            guards[day.guard].pattern = guardSleepMinutes;
            guards[day.guard].totalSleepTime = sleepTime;
        }
    });

    return guards;
}

function findTheSleepiestGuardMinute(guards) {
    let currentGuard = 0;
    let sleepiestGuard = '';

    for (let guard in guards) {
        if (guards[guard].totalSleepTime > currentGuard) {
            sleepiestGuard = guard;
            currentGuard = guards[guard].totalSleepTime;
        }
    }

    let currentMin = 0;
    let sleepiestMin = 0;
    for (let min in guards[sleepiestGuard].pattern) {
        if (guards[sleepiestGuard].pattern[min] > currentMin) {
            sleepiestMin = min;
            currentMin = guards[sleepiestGuard].pattern[min];
        }
    }

    console.log(`Sleepiest guard is ${sleepiestGuard} with sleepiest minute ${sleepiestMin}`);
}

function findTheMostFrequentMinute(guards) {
    let currentGuard = '';
    let currenttMin = '';
    let highestMin = '';

    for (let guard in guards) {
        for (let min in guards[guard].pattern) {
            if (guards[guard].pattern[min] > highestMin) {
                highestMin = guards[guard].pattern[min];
                currenttMin = min;
                currentGuard = guard
            }
        }
    }
    
    console.log(`Guard ${currentGuard} has the most frequent sleep minute at #${currenttMin}`);
}