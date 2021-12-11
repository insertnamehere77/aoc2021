const fs = require('fs');

const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const inputArr = inputStr
        .split('\n')
        .filter(line => line !== '')
        .map(line => line.split('')
            .map(str => parseInt(str)));

    return inputArr;
}

const incrementAll = (input) => input
    .map(row => row
        .map(octopus => octopus + 1));


const getAdjacentCoords = (xCoord, yCoord, input) => {
    const points = [];
    for (let y = yCoord - 1; y <= yCoord + 1; y++) {
        for (let x = xCoord - 1; x <= xCoord + 1; x++) {
            if (y === yCoord && x === xCoord) {
                continue;
            }
            const octopus = (input[y] || [])[x];
            if (octopus !== undefined) {
                points.push({ x, y });
            }
        }
    }

    return points;
}

const doFlashes = (input) => {
    const flashCoords = [];
    const newOctopi =
        input
            .map((row, y) => row
                .map((octopus, x) => {
                    if (octopus > 9) {
                        flashCoords.push({ x, y });
                        return 0;
                    }
                    return octopus;
                }));

    const adjCoords = flashCoords
        .flatMap(coord => getAdjacentCoords(coord.x, coord.y, input));

    for (coord of adjCoords) {
        const octopus = newOctopi[coord.y][coord.x];
        if (octopus !== 0) {
            newOctopi[coord.y][coord.x]++;
        }
    }

    return {
        numFlashes: flashCoords.length,
        newOctopi
    }

}


const runStep = (input) => {
    const incrementedOctopi = incrementAll(input);

    let lastFlashed = false;
    let numTotalFlashes = 0;
    let newOctopi = [...incrementedOctopi];
    do {
        const result = doFlashes(newOctopi);
        lastFlashed = result.numFlashes > 0;
        numTotalFlashes += result.numFlashes;
        newOctopi = result.newOctopi;
    } while (lastFlashed);


    return {
        numFlashes: numTotalFlashes,
        newOctopi
    }

};

const findSolution = (input) => {
    let currStep = 0;
    let currOctopi = [...input];
    let flashSynced = false;

    const numOctopi = input.length * input[0].length;

    while (!flashSynced) {
        const stepResult = runStep(currOctopi);
        currOctopi = stepResult.newOctopi;
        currStep++;
        flashSynced = stepResult.numFlashes === numOctopi;
    }

    return currStep;
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();