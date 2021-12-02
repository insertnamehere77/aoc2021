const fs = require('fs');

const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const inputArr = inputStr
        .split('\n')
        .filter(line => line !== '')
        .map(line => {
            const [dir, unit] = line.split(' ');
            return { direction: dir, unit: parseInt(unit) }
        });
    return inputArr;
}

const findSolution = (input) => {
    let x = 0;
    let y = 0;
    input.forEach(inst => {
        switch (inst.direction) {
            case 'forward':
                x += inst.unit;
                break;
            case 'up':
                y -= inst.unit;
                break;
            case 'down':
                y += inst.unit;
                break;
            default:
                console.log(`Unrecognized direction: ${inst.direction}`)
        }
    });

    console.log(`x: ${x} y: ${y}`);
    return x * y;
}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();