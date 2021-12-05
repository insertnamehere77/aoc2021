const fs = require('fs');

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static fromStr(str) {
        const [xStr, yStr] = str.split(',');
        return new Point(parseInt(xStr), parseInt(yStr));
    }

    distanceFrom(other) {
        const xComponent = Math.pow(this.x - other.x, 2);
        const yComponent = Math.pow(this.y - other.y, 2);
        return Math.sqrt(xComponent + yComponent);
    }
}

class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.length = p1.distanceFrom(p2);
    }

    static fromStr(str) {
        const [p1Str, p2Str] = str.split(' -> ');
        return new Line(Point.fromStr(p1Str), Point.fromStr(p2Str));
    }

    isHorizontal() {
        return this.p1.y === this.p2.y;
    }

    isVertical() {
        return this.p1.x === this.p2.x;
    }

    includes(point) {
        return Math.abs(
            this.length - (point.distanceFrom(this.p1) + point.distanceFrom(this.p2)))
            <= 0.0005;
    }
}


const readInput = (filePath) => {
    const inputBuf = fs.readFileSync(filePath);
    const inputStr = inputBuf.toString();
    const inputArr = inputStr
        .split('\n')
        .filter(line => line !== '')
        .map(lineStr => Line.fromStr(lineStr))
        .filter(line => line.isHorizontal() || line.isVertical());

    return inputArr;
}

const findUpperBound = (input, key) => {
    const options = input.map(line => [line.p1[key], line.p2[key]]).flat()
    return Math.max(...options);
}

const findLowerBound = (input, key) => {
    const options = input.map(line => [line.p1[key], line.p2[key]]).flat()
    return Math.min(...options);
}

const pointIsOnAtLeast = (point, lines, num) => {
    let numOnLine = 0;
    for (let line of lines) {
        if (line.includes(point)) {
            numOnLine++;
        }

        if (numOnLine >= num) {
            return true;
        }
    }
    return false;
}

const findSolution = (input) => {
    const xMax = findUpperBound(input, 'x');
    const yMax = findUpperBound(input, 'y');

    const xMin = findLowerBound(input, 'x');
    const yMin = findLowerBound(input, 'y');

    let numPointsOnMinLines = 0;
    for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            const currPoint = new Point(x, y);
            if (pointIsOnAtLeast(currPoint, input, 2)) {
                numPointsOnMinLines++;
            }
        }
    }

    return numPointsOnMinLines;

}

const main = () => {
    const input = readInput(process.argv[2]);
    const solution = findSolution(input);
    console.log(solution);
};

main();