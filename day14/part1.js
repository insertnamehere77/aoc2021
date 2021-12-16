const fs = require('fs');

const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const [templateStr, rulesStr] = inputStr.split('\n\n');

    const template = templateStr.split('');
    const rules = rulesStr
        .split('\n')
        .filter(line => line)
        .reduce((rules, str) => {
            const [start, end] = str.split(' -> ');
            rules[start] = end;
            return rules;
        }, {});

    return { template, rules };
}

const runStep = (polymer, rules) => {
    const newPolymer = [];
    for (let i = 0; i < polymer.length; i++) {
        const curr = polymer[i];
        const next = polymer[i + 1];
        const insert = rules[curr + next];
        newPolymer.push(curr);
        if (insert) {
            newPolymer.push(insert);
        }
    }
    return newPolymer;
}

const countOccurences = (polymer) => {
    const numOccurences = {};
    for (let char of polymer) {
        const num = numOccurences[char] || 0;
        numOccurences[char] = num + 1;
    }
    return numOccurences;
}

const findSolution = (input) => {
    let polymer = input.template;
    for (let i = 0; i < 10; i++) {
        polymer = runStep(polymer, input.rules);
    }

    const occurences = countOccurences(polymer);
    const values = Object.values(occurences);
    const max = Math.max(...values);
    const min = Math.min(...values);
    return max - min;
};

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();