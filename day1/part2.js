const fs = require('fs');

const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const inputArr = inputStr
        .split('\n')
        .map(numStr => parseInt(numStr))
        .filter(num => !isNaN(num));
    return inputArr;
}

const createWindows = (input) => {
    const windows = [];
    for (let i = 0; i < (input.length - 2); i++) {
        const window = input[i] + input[i + 1] + input[i + 2];
        windows.push(window)
    }
    return windows;
}

const findSolution = (input) => {
    let numIncrease = 0;
    for (let i = 1; i < input.length; i++) {
        if (input[i] > input[i - 1]) {
            numIncrease++;
        }
    }
    return numIncrease;

}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(createWindows(input));
    console.log(solution);
};

main();