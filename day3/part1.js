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
        gamma: num0 > num1 ? '0' : '1',
        epsilon: num1 < num0 ? '1' : '0'
    }
}



const findSolution = (input) => {
    const numCols = input[0].length;
    let gammaStr = '';
    let epsilonStr = '';
    for (let i = 0; i < numCols; i++) {
        const values = findGammaAndEpsilon(input, i);
        gammaStr += values.gamma;
        epsilonStr += values.epsilon;
    }

    return parseInt(gammaStr, 2) * parseInt(epsilonStr, 2);
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();