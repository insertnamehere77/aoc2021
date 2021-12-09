const fs = require('fs');

const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const inputArr = inputStr
        .split('\n')
        .filter(line => line !== '')
        .map(str => str.split(' | ')[1])
        .flatMap(str => str.split(' '));

    return inputArr;
}


const findSolution = (input) => {
    const uniqSegments = [2, 4, 3, 7];
    const uniqSegmentNumbers = input.filter(str => uniqSegments.includes(str.length));
    return uniqSegmentNumbers.length;
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();