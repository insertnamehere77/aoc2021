const fs = require('fs');

const incrementObjVal = (obj, key, inc = 1) => {
    const existingNum = obj[key] || 0;
    obj[key] = existingNum + inc;
}

const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const [template, rulesStr] = inputStr.split('\n\n');

    const pairs = {};
    for (let i = 0; i < (template.length - 1); i++) {
        const pair = template[i] + template[i + 1];
        incrementObjVal(pairs, pair);
    }

    const chars = {};
    for (let i = 0; i < template.length; i++) {
        incrementObjVal(chars, template[i]);
    }

    const rules = rulesStr
        .split('\n')
        .filter(line => line)
        .reduce((rules, str) => {
            const [start, end] = str.split(' -> ');
            rules[start] = end;
            return rules;
        }, {});


    return { pairs, rules, chars };
}


const runStep = (pairs, rules, chars) => {
    const newPairs = { ...pairs };
    for (const [ogPair, ogNum] of Object.entries(pairs)) {
        const insert = rules[ogPair];
        if (insert) {
            incrementObjVal(chars, insert, ogNum);

            const firstPair = ogPair[0] + insert;
            incrementObjVal(newPairs, firstPair, ogNum);

            const secondPair = insert + ogPair[1];
            incrementObjVal(newPairs, secondPair, ogNum);

            incrementObjVal(newPairs, ogPair, -ogNum);
            if (newPairs[ogPair] <= 0) {
                delete newPairs[ogPair];
            }
        }
    }
    return newPairs;
}

const findSolution = (input) => {
    let pairs = { ...input.pairs };
    for (let i = 0; i < 40; i++) {
        pairs = runStep(pairs, input.rules, input.chars);
    }

    const values = Object.values(input.chars);
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