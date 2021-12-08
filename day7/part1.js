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


const findTotalPositionCost = (position, subs) => {
    let cost = 0;
    for (let sub of subs) {
        cost += Math.abs(position - sub)
    }
    return cost;
}


const findSolution = (subs) => {
    const min = Math.min(...subs);
    const max = Math.max(...subs);
    let minCost = Infinity;
    for (let position = min; position <= max; position++) {
        const cost = findTotalPositionCost(position, subs);

        if (cost < minCost) {
            minCost = cost;
        }
    }

    return minCost;
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();