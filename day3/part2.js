const fs = require('fs');

const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const inputArr = inputStr
        .split('\n')
        .filter(line => line !== '');
    return inputArr;
}

const findGammaAndEpsilon = (input, i) => {
    let num0 = 0;
    let num1 = 0;
    input.forEach(line => {
        const char = line[i];
        if (char === '1') {
            num1++;
        } else {
            num0++;
        }
    });

    return {
        gamma: num1 >= num0 ? '1' : '0',
        epsilon: num0 <= num1 ? '0' : '1'
    }
}

const findRating = (input, fieldName) => {
    const numCols = input[0].length;
    let pool = [...input];

    for (let i = 0; i < numCols; i++) {
        const values = findGammaAndEpsilon(pool, i);
        pool = pool.filter(num => num[i] === values[fieldName]);
        if (pool.length === 1) {
            break;
        }
    }

    return parseInt(pool[0], 2);
}

const findSolution = (input) => {
    const oxygenRating = findRating(input, 'gamma');
    const co2Rating = findRating(input, 'epsilon');

    return oxygenRating * co2Rating;
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();