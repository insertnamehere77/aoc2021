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

const getMatchingClose = (open) => CLOSINGS[OPENINGS.indexOf(open)];

const getMissingSequence = (line) => {
    const enclosingStack = [];
    for (char of line) {
        if (OPENINGS.includes(char)) {
            enclosingStack.push(char);
        } else if (CLOSINGS.includes(char)) {
            const open = enclosingStack.pop();
            if (!openMatchesClose(open, char)) {
                return null;
            }
        }
    }

    let sequence = '';
    while (enclosingStack.length > 0) {
        sequence += getMatchingClose(enclosingStack.pop());
    }
    return sequence;

}

const getSequenceScore = (sequence) => {
    const scoreMap = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4,
    }
    return [...sequence]
        .reduce((total, currChar) => (5 * total) + scoreMap[currChar], 0);
}

const getMiddleScore = (scores) => {
    const sortedScores = scores
        .sort((a, b) => {
            if (b < a) {
                return -1;
            }
            if (b > a) {
                return 1;
            }
            return 0;
        });
    const midPoint = Math.floor(sortedScores.length / 2);
    return sortedScores[midPoint];
}

const findSolution = (input) => {
    const scores = [];
    for (line of input) {
        const missingSequence = getMissingSequence(line);
        if (missingSequence !== null) {
            scores.push(getSequenceScore(missingSequence));
        }
    }
    return getMiddleScore(scores);
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();