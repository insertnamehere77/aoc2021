const fs = require('fs');


const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const inputArr = inputStr
        .split('\n')
        .filter(line => line !== '')
        .map(line => line.split('').map(str => parseInt(str)));

    return inputArr;
}

const getAdjacentHeights = (xCoord, yCoord, input) => {
    const heights = [];
    for (let y = yCoord - 1; y <= yCoord + 1; y++) {
        for (let x = xCoord - 1; x <= xCoord + 1; x++) {
            if (y === yCoord && x === xCoord) {
                continue;
            }
            if (y !== yCoord && x !== xCoord) {
                continue;
            }
            const row = input[y] || [];
            heights.push(row[x]);
        }
    }

    return heights.filter(height => height !== undefined);
}


const findSolution = (input) => {
    const lowPointRisks = [];
    for (let y = 0; y < input.length; y++) {
        const row = input[y];
        for (let x = 0; x < row.length; x++) {
            const adjHeights = getAdjacentHeights(x, y, input);
            const currHeight = row[x];
            const isLowPoint = adjHeights.every(height => height > currHeight);
            if (isLowPoint) {
                lowPointRisks.push(currHeight + 1);
            }
        }
    }

    return lowPointRisks.reduce((total, curr) => total + curr, 0);
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();