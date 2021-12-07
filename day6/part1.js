const fs = require('fs');



const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const inputArr = inputStr
        .split(',')
        .filter(line => line !== '')
        .map(str => parseInt(str));

    return inputArr;
}

const runDay = (input) => {
    const newDay = [];
    input.forEach(fish => {
        if (fish === 0) {
            newDay.push(6);
            newDay.push(8);
        } else {
            newDay.push(fish - 1);
        }
    });

    return newDay;
};


const findSolution = (input) => {
    let currDay = [...input];
    for (let i = 0; i < 80; i++) {
        currDay = runDay(currDay);
    }

    return currDay.length;
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();