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

const isLowPoint = (x, y, input) => {
    const adjHeights = getAdjacentHeights(x, y, input);
    const currHeight = input[y][x];
    return adjHeights.every(height => height > currHeight);
}

const isPartOfBasin = (x, y, input) => {
    const currHeight = input[y][x];
    return currHeight !== 9;
}

const getAdjacentPoints = (xCoord, yCoord, input) => {
    const points = [];
    for (let y = yCoord - 1; y <= yCoord + 1; y++) {
        for (let x = xCoord - 1; x <= xCoord + 1; x++) {
            if (y === yCoord && x === xCoord) {
                continue;
            }
            if (y !== yCoord && x !== xCoord) {
                continue;
            }
            const height = (input[y] || [])[x];
            if (height !== undefined) {
                points.push({ x, y });
            }
        }
    }

    return points;
}

const getAdjacentHeights = (xCoord, yCoord, input) =>
    getAdjacentPoints(xCoord, yCoord, input)
        .map(point => input[point.y][point.x]);

const makePointKey = (point) => `${point.x}-${point.y}`;

const getBasinSize = (x, y, input, visitedList) => {
    let basinSize = 0;
    if (visitedList.has(makePointKey({ x, y })) ||
        !isLowPoint(x, y, input)) {
        return basinSize;
    }

    const pointQueue = [{ x, y }];
    while (pointQueue.length !== 0) {
        const point = pointQueue.pop();

        if (visitedList.has(makePointKey(point)) ||
            !isPartOfBasin(point.x, point.y, input)) {
            continue;
        }

        visitedList.add(makePointKey(point));
        basinSize += 1;

        const adjPoints = getAdjacentPoints(point.x, point.y, input);
        adjPoints
            .filter(point => !visitedList.has(makePointKey(point)))
            .forEach(point => pointQueue.push(point));
    }

    return basinSize;
}


const findSolution = (input) => {
    const basinSizes = [];
    const visitedList = new Set();
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            basinSizes.push(getBasinSize(x, y, input, visitedList));
        }
    }

    return basinSizes
        .sort((a, b) => {
            if (b < a) {
                return -1;
            }
            if (b > a) {
                return 1;
            }
            return 0;
        })
        .slice(0, 3)
        .reduce((total, curr) => curr * total, 1);
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();