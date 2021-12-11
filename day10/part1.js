const fs = require('fs');

const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const inputArr = inputStr
        .split('\n')
        .filter(line => line !== '')
        .map(line => line.split(''));

    return inputArr;
}

const OPENINGS = ['{', '[', '<', '('];
const CLOSINGS = ['}', ']', '>', ')'];

const openMatchesClose = (open, close) =>
    OPENINGS.indexOf(open) === CLOSINGS.indexOf(close);

const findCorruptChar = (line) => {
    const enclosingStack = [];
    for (char of line) {
        if (OPENINGS.includes(char)) {
            enclosingStack.push(char);
        } else if (CLOSINGS.includes(char)) {
            const open = enclosingStack.pop();
            if (!openMatchesClose(open, char)) {
                return char;
            }

        }
    }
}

const findSolution = (input) => {
    const scoreMap = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    }
    let totalScore = 0;
    for (line of input) {
        const lineScore = scoreMap[findCorruptChar(line)] || 0;
        totalScore += lineScore;
    }
    return totalScore;
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();