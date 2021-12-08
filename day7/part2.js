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

const findSinglePositionCost = (diff) => {
    let cost = 0;
    for (let i = 1; i <= diff; i++) {
        cost += i;
    }
    return cost;
}

const findTotalPositionCost = (position, subs) => {
    let cost = 0;
    for (let sub of subs) {
        const diff = Math.abs(position - sub);
        cost += findSinglePositionCost(diff);
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