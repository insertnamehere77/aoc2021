const fs = require('fs');

const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const [pointStr, foldStr] = inputStr.split('\n\n');

    const points = pointStr
        .split('\n')
        .filter(line => line)
        .map(str => {
            const [xStr, yStr] = str.split(',');
            return {
                x: parseInt(xStr),
                y: parseInt(yStr)
            }
        });


    const folds = foldStr
        .split('\n')
        .filter(line => line)
        .map(str => {
            const [axis, line] = str.replace('fold along ', '').split('=');
            return {
                axis,
                line: parseInt(line)
            }
        });

    return { points, folds };
}


const foldPoint = (point, fold) => {
    const dist = Math.abs(point[fold.axis] - fold.line);
    return {
        ...point,
        [fold.axis]: fold.line - dist
    }
};

const foldAllPoints = (points, fold) => {
    const foldedPoints =
        points
            .filter(point => fold.line <= point[fold.axis])
            .map(point => foldPoint(point, fold));
    const unfoldedPoints =
        points
            .filter(point => fold.line > point[fold.axis]);
    return [...unfoldedPoints, ...foldedPoints];
}


const displayPoints = (points) => {
    const xMax = Math.max(...points.map(point => point.x));
    const yMax = Math.max(...points.map(point => point.y));

    const displayPoints = [];
    for (let y = 0; y <= yMax; y++) {
        const row = [];
        for (let x = 0; x <= xMax; x++) {
            row.push(' ');
        }
        displayPoints.push(row);
    }

    points.forEach(point => {
        displayPoints[point.y][point.x] = '#';
    });
    console.log(displayPoints.map(row => row.join('')).join('\n'));
}


const findSolution = (input) => {
    let points = [...input.points];
    for (let fold of input.folds) {
        points = foldAllPoints(points, fold);
    }
    displayPoints(points);
    const pointSet = new Set(points.map(point => `${point.x}-${point.y}`));
    return pointSet.size;
};

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();