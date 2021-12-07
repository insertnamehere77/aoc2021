const fs = require('fs');



const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const inputArr = inputStr
        .split(',')
        .filter(line => line !== '')
        .map(str => parseInt(str));

    const ocean = {};
    inputArr.forEach(fish => {
        const numFish = ocean[fish] || 0;
        ocean[fish] = numFish + 1;
    });

    return ocean;
}

//Had to re-think how I stored the fish. A simple array worked for 80 days but would crash node with 256 days.
//So part 2 uses a simple dictionary, where the key represents the internal clock of the fish and the values represent the number of fish with that internal clock
const runDay = (input) => {
    const newDay = {};
    const mergeInNewFish = (newFish, numNewFish) => {
        const existingNumFish = newDay[newFish] || 0;
        newDay[newFish] = existingNumFish + numNewFish;
    }

    for (const [fish, numFish] of Object.entries(input)) {
        const fishInt = parseInt(fish);
        if (fishInt === 0) {
            mergeInNewFish(6, numFish);
            mergeInNewFish(8, numFish);
        } else {
            mergeInNewFish(fishInt - 1, numFish);
        }
    }

    return newDay;
};


const findSolution = (input) => {
    let currDay = { ...input };
    for (let i = 0; i < 256; i++) {
        currDay = runDay(currDay);
    }

    return Object.values(currDay)
        .reduce((sum, curr) => sum + curr, 0);
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();