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
    const solution = findSolution(input);
    console.log(solution);
};

main();