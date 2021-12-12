const fs = require('fs');

class Cave {
    constructor(id) {
        this.id = id;
        this.tunnels = [];
    }

    addTunnel(newCave) {
        this.tunnels.push(newCave);
    }

    isSmall() {
        return this.id === this.id.toLowerCase();
    }

    isEnd() {
        return this.id === 'end';
    }
}

const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const inputArr = inputStr
        .split('\n')
        .filter(line => line !== '');

    const caveMap = {};
    for (let line of inputArr) {
        const [beginId, endId] = line.split('-');

        const beginCave = caveMap[beginId] || new Cave(beginId);
        const endCave = caveMap[endId] || new Cave(endId);

        beginCave.addTunnel(endCave);
        endCave.addTunnel(beginCave);

        caveMap[beginId] = beginCave;
        caveMap[endId] = endCave;
    }

    return caveMap;
}


const findPathsToEnd = (cave, visitedSet = new Set()) => {
    visitedSet.add(cave.id);
    if (cave.isEnd()) {
        return [cave.id];
    }

    const paths = [];
    const possibleTunnels = cave.tunnels
        .filter(tunnel => !(tunnel.isSmall() && visitedSet.has(tunnel.id)));

    for (let tunnel of possibleTunnels) {
        const tunnelPaths = findPathsToEnd(tunnel, new Set(visitedSet))
            .map(path => [cave.id, ...path]);
        paths.push(tunnelPaths);
    }

    return paths.flat();
}

const findSolution = (input) => {
    const startCave = input['start'];
    const paths = findPathsToEnd(startCave);
    return paths.length;
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();